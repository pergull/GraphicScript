module GraphicScript {

    export enum RenderMode {
        Render,
        BoundBox
    }

    enum InteractiveType {
        None,
        Rotate,
        Pan
    }

    export enum Dimensions {
        Two,
        Three
    }

    export class GraphicContext {

        graphicScript: RunScript;
        graphicArea;
        haveGraphicDisplay = true;
        curGraphicAreaWidth = 0;
        curGraphicAreaHeight = 0;
        gl: WebGLRenderingContext;
        camera: Camera;
        setupCamera = true;
        hasViewDirection = false;
        hasViewUp = false;
        hasZoomOrPan = false;
        shaderColorVertex: ShaderColorVertex;
        shaderColorNormalVertex: ShaderColorNormalVertex;
        width;
        height;
        renderLoopId;
        dimensions = Dimensions.Two;
        displayBoundingBox = true;
        backgroundColor = [0, 0, 0];
        bBoxAxisText = new Text(
            0, 0, 0,
            1, 0,
            1, 1,
            Text.CENTER_CENTER,
            new Font(),
            "");
        calcBoundBox = true;

        renderMode: RenderMode;

        projection: Matrix;
        modelview: Matrix;
        modelviewInverse: Matrix;
        modelViewProjection: Matrix;

        bBox: BoundBox;
        bSphere: Sphere;
        modelBoundSphere: Sphere;

        startTime;
        currentTime;

        // mouse & touch
        isTouchEvent = false;
        touchNum: number;
        touchWindowSizeStart: number;
        mouseButton;
        mouseX = [];
        mouseY = [];
        doMouseMove = false;
        didMouseMove = false;
        processInteractive;
        interactiveType;
        xStart = [];
        yStart = [];
        xEnd = [];
        yEnd = [];
        currentViewDirection = new Vector();
        currentUpVector = new Vector();
        currentXAxis: Vector;
        currentYAxis: Vector;
        currentCenter = new Vector();
        currentPosition = new Vector();
        doPan = false;

        // key codes
        static readonly controlKey = 17;

        constructor() {
            this.graphicArea = document.getElementById('graphicArea');

            this.width = this.graphicArea.width;
            this.height = this.graphicArea.height;

            // Get a WebGL context
            this.gl = this.createWebGLContext(this.graphicArea, {});
            if (!this.gl) {
                alert("WebGL graphic context not available.");
                return;
            }
        }

        static getOS(): string {
            var userAgent = window.navigator.userAgent,
                platform = window.navigator.platform,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                os = null;

            if (macosPlatforms.indexOf(platform) !== -1) {
                os = 'Mac OS';
            } else if (iosPlatforms.indexOf(platform) !== -1) {
                os = 'iOS';
            } else if (windowsPlatforms.indexOf(platform) !== -1) {
                os = 'Windows';
            } else if (/Android/.test(userAgent)) {
                os = 'Android';
            } else if (!os && /Linux/.test(platform)) {
                os = 'Linux';
            }

            return os;
        }

        renderLoop() {
            gc.renderGraphicArea();
        }

        startGrapicDisplay() {
            if (gc.haveGraphicDisplay == false) {
                gc.haveGraphicDisplay = true;
                gc.resizeWindow();
            }
        }

        stopGrapicDisplay() {
            clearInterval(this.renderLoopId);
            this.haveGraphicDisplay = false;
        }

        setupEvents() {

            // keyboard events
            window.addEventListener("keydown", this.keydown);
            window.addEventListener("keyup", this.keyup);

            // touch events
            this.graphicArea.addEventListener("touchstart", this.touchstart);
            this.graphicArea.addEventListener("touchmove", this.touchmove);
            this.graphicArea.addEventListener("touchend", this.touchend);

            // mouse events
            this.graphicArea.addEventListener("mousedown", this.mousedown);
            this.graphicArea.addEventListener("mousemove", this.mousemove);
            this.graphicArea.addEventListener("mouseup", this.mouseup);
            this.graphicArea.addEventListener("mousewheel", this.mousewheel);
            this.graphicArea.addEventListener("DOMMouseScroll", this.mousewheel); // for firefox

            // mouse init events
            this.graphicArea.addEventListener("dragend", this.initMouseStateEvent);
            this.graphicArea.addEventListener("mouseenter", this.initMouseStateEvent);
            this.graphicArea.addEventListener("mouseleave", this.initMouseStateEvent);
        }

        initMouseState() {
            this.interactiveType = InteractiveType.None;
            this.processInteractive = false;
            this.doMouseMove = false;
            this.didMouseMove = false;
        }

        initMouseStateEvent(e) {
            gc.initMouseState();
        }

        keydown(e: KeyboardEvent) {
            if (gc.doPan !== true) {
                if (GraphicContext.getOS() === "Mac OS") {
                    if (e.code === "MetaLeft" || e.code === "MetaRight" || e.code === "OSLeft" || e.code === "OSRight") {
                        gc.doPan = true;
                    }
                } else {
                    if (e.keyCode === GraphicContext.controlKey) {
                        gc.doPan = true;
                    }
                }

                if (gc.doPan === true) {
                    if (gc.doMouseMove) {
                        gc.pointerDown();
                    }
                }
            }
        }

        keyup(e: KeyboardEvent) {
            if (gc.doPan !== false) {
                if (GraphicContext.getOS() === "Mac OS") {
                    if (e.code === "MetaLeft" || e.code === "MetaRight" || e.code === "OSLeft" || e.code === "OSRight") {
                        gc.doPan = false;
                    }
                } else {
                    if (e.keyCode === GraphicContext.controlKey) {
                        gc.doPan = false;
                    }
                }

                if (gc.doPan === false) {
                    if (gc.doMouseMove) {
                        gc.pointerDown();
                    }
                }
            }
        }

        setMouseLocation(x: number, y: number) {
            var rect = gc.graphicArea.getBoundingClientRect();
            gc.mouseX[0] = x - rect.left;
            gc.mouseY[0] = y - rect.top;
        }

        setTouchLocation(e) {
            gc.touchNum = e.targetTouches.length;
            var rect = gc.graphicArea.getBoundingClientRect();
            for (var i = 0; i < e.targetTouches.length; i++) {
                gc.mouseX[i] = e.targetTouches[i].pageX - rect.left;
                gc.mouseY[i] = e.targetTouches[i].pageY - rect.top;
            }
        }

        devicePixelRatio() {
            return window.devicePixelRatio || 1;
        }

        applyDevicePixelRatio(graphicArea, width, height) {
            // set the display size of the graphicArea
            var desiredWidthInCSSPixels = width;
            var desiredHeightInCSSPixels = height;
            graphicArea.style.width = desiredWidthInCSSPixels + "px";
            graphicArea.style.height = desiredHeightInCSSPixels + "px";

            // set the size of the drawingBuffer
            graphicArea.width = desiredWidthInCSSPixels * this.devicePixelRatio();
            graphicArea.height = desiredHeightInCSSPixels * this.devicePixelRatio();
        }

        resizeWebGLGraphicArea(graphicArea, width, height) {
            gc.applyDevicePixelRatio(graphicArea, width, height);

            gc.width = graphicArea.width;
            gc.height = graphicArea.height;

            gc.camera.reshape();
        }

        touchRotate() {
            gc.interactiveType = InteractiveType.Rotate;

            gc.xStart[0] = gc.xEnd[0] = gc.mouseX[0];
            gc.yStart[0] = gc.yEnd[0] = gc.mouseY[0];

            gc.currentViewDirection.x = this.camera.viewDirection.x;
            gc.currentViewDirection.y = this.camera.viewDirection.y;
            gc.currentViewDirection.z = this.camera.viewDirection.z;

            gc.currentUpVector.x = this.camera.upVector.x;
            gc.currentUpVector.y = this.camera.upVector.y;
            gc.currentUpVector.z = this.camera.upVector.z;
        }

        touchPan() {
            gc.interactiveType = InteractiveType.Pan;

            gc.xStart[0] = gc.xEnd[0] = gc.mouseX[0];
            gc.yStart[0] = gc.yEnd[0] = gc.mouseY[0];
            gc.xStart[1] = gc.xEnd[1] = gc.mouseX[0];
            gc.yStart[1] = gc.yEnd[1] = gc.mouseY[0];

            // for pan
            this.currentCenter.copy(this.camera.center);
            this.currentPosition.copy(this.camera.position);
        }

        touchScaleAndPan() {
            gc.interactiveType = InteractiveType.Pan;

            gc.xStart[0] = gc.xEnd[0] = gc.mouseX[0];
            gc.yStart[0] = gc.yEnd[0] = gc.mouseY[0];
            gc.xStart[1] = gc.xEnd[1] = gc.mouseX[1];
            gc.yStart[1] = gc.yEnd[1] = gc.mouseY[1];

            // for pan
            this.currentCenter.copy(this.camera.center);
            this.currentPosition.copy(this.camera.position);
        }

        mouseRotate() {
            gc.interactiveType = InteractiveType.Rotate;

            gc.xStart[0] = gc.xEnd[0] = gc.mouseX[0];
            gc.yStart[0] = this.yEnd[0] = gc.mouseY[0];

            gc.currentViewDirection.x = this.camera.viewDirection.x;
            gc.currentViewDirection.y = this.camera.viewDirection.y;
            gc.currentViewDirection.z = this.camera.viewDirection.z;

            gc.currentUpVector.x = this.camera.upVector.x;
            gc.currentUpVector.y = this.camera.upVector.y;
            gc.currentUpVector.z = this.camera.upVector.z;
        }

        mousePan() {
            gc.interactiveType = InteractiveType.Pan;

            gc.xStart[0] = gc.xEnd[0] = gc.mouseX[0];
            gc.yStart[0] = gc.yEnd[0] = gc.mouseY[0];

            this.currentCenter.copy(this.camera.center);
            this.currentPosition.copy(this.camera.position);
        }

        pointerDown() {
            gc.doMouseMove = true;

            if (this.isTouchEvent) {
                if (gc.touchNum == 1) {
                    if (gc.dimensions == Dimensions.Three) {
                        this.touchRotate();
                    }
                    else {
                        this.touchPan();
                    }
                }
                else if (gc.touchNum == 2) {
                    this.touchScaleAndPan();
                }
            }
            else {
                if (gc.mouseButton == 0) {
                    if (gc.dimensions == Dimensions.Three) {
                        if (this.doPan) {
                            this.mousePan();
                        } else {
                            this.mouseRotate();
                        }
                    }
                    else {
                        this.mousePan();
                    }
                }
            }
        }

        pointerMove() {
            if (gc.interactiveType != InteractiveType.None) {
                gc.xEnd[0] = gc.mouseX[0];
                gc.yEnd[0] = gc.mouseY[0];
                gc.processInteractive = true;
                gc.didMouseMove = true;
            }
        }

        mouseZoom(wheelDelta: number) {

            const factor = 1.1;
            if (wheelDelta > 0) {
                gc.camera.zoom(factor);
            } else {
                gc.camera.zoom(1 / factor);
            }
        }

        mousewheel(e) {

            // cross-browser wheel delta
            const wheelDelta = Math.max(-1, Math.min(1, (-e.wheelDelta || e.detail)));

            gc.mouseZoom(wheelDelta);
        }

        mousedown(e) {
            if (e.button == 0) {
                gc.isTouchEvent = false;
                gc.mouseButton = e.button;
                gc.setMouseLocation(e.clientX, e.clientY);
                gc.pointerDown();
                gc.didMouseMove = false;
            }
        }

        mousemove(e) {
            if (gc.doMouseMove) {
                gc.isTouchEvent = false;
                gc.setMouseLocation(e.clientX, e.clientY);
                gc.pointerMove();
            }
        }

        mouseup(e) {
            gc.initMouseState();
        }

        touchstart(e) {
            gc.isTouchEvent = true;
            gc.setTouchLocation(e);
            gc.pointerDown();
            gc.touchWindowSizeStart = gc.camera.windowSize;
            gc.didMouseMove = false;
        }

        touchmove(e) {
            if (gc.doMouseMove) {
                gc.isTouchEvent = true;

                gc.setTouchLocation(e);

                if (gc.touchNum == 1) {
                    gc.pointerMove();

                    if (gc.dimensions == Dimensions.Two) {
                        gc.camera.windowSize = gc.touchWindowSizeStart;

                        gc.xEnd[0] = gc.mouseX[0];
                        gc.yEnd[0] = gc.mouseY[0];
                        gc.xEnd[1] = gc.mouseX[0];
                        gc.yEnd[1] = gc.mouseY[0];

                        gc.processInteractive = true;
                    }
                }
                else if (gc.touchNum == 2) {

                    gc.camera.windowSize = gc.touchWindowSizeStart;

                    gc.xEnd[0] = gc.mouseX[0];
                    gc.yEnd[0] = gc.mouseY[0];
                    gc.xEnd[1] = gc.mouseX[1];
                    gc.yEnd[1] = gc.mouseY[1];

                    var dxStart = gc.xStart[1] - gc.xStart[0];
                    var dyStart = gc.yStart[1] - gc.yStart[0];
                    var lengthStart = Math.sqrt(dxStart * dxStart + dyStart * dyStart);
                    var dxEnd = gc.xEnd[1] - gc.xEnd[0];
                    var dyEnd = gc.yEnd[1] - gc.yEnd[0];
                    var lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd);
                    var lengthDelta = lengthEnd - lengthStart;
                    var factor = 1 - lengthDelta * 0.002;

                    gc.camera.zoom(factor);

                    // needed for pan
                    gc.processInteractive = true;
                }

                gc.didMouseMove = true;
            }
        }

        touchend(e) {
            gc.isTouchEvent = true;
            gc.mouseup(e);
        }

        createWebGLContext(graphicArea: HTMLCanvasElement, opt_attribs) {
            var names = ["webgl", "experimental-webgl"];
            var context = null;
            for (var ii = 0; ii < names.length; ++ii) {
                try {
                    context = graphicArea.getContext(names[ii], opt_attribs);
                } catch (e) { }
                if (context) {
                    break;
                }
            }
            return context;
        }

        init() {
            this.camera = new Camera(new Vector(0, 0, -1), new Vector(0, 1, 0));
            this.shaderColorVertex = new ShaderColorVertex();
            this.shaderColorNormalVertex = new ShaderColorNormalVertex();

            this.projection = new Matrix();
            this.modelview = new Matrix();
            this.modelviewInverse = new Matrix();
            this.modelViewProjection = new Matrix();

            this.bBox = new BoundBox();
            this.bSphere = new Sphere();
            this.modelBoundSphere = new Sphere();

            this.initMouseState();

            this.initWebGL();

            window.onresize = function () {
                gc.resizeWindow();
            };

            window.addEventListener("orientationchange", function () {
                gc.resizeWindow();
            });

            this.setupEvents();

            var fps = 40;
            this.renderLoopId = setInterval(this.renderLoop, 1000 / fps, this);

            var refreshWindowSizePerSec = 10;
            setInterval(this.resizeWindow, 1000 / refreshWindowSizePerSec, this);

            gc.resizeWindow();
        }

        initWebGL() {
            this.gl.enable(this.gl.DEPTH_TEST);
            gc.gl.enable(gc.gl.POLYGON_OFFSET_FILL);
            gc.gl.polygonOffset(1, 1);
        }

        renderGraphicArea() {
            this.processMouse();
            this.updateMatrix();
            this.render();
        }

        updateMatrix() {
            this.modelViewProjection.identity();
            this.modelViewProjection.multiplyWith(this.projection);
            this.modelViewProjection.multiplyWith(this.modelview);
            this.modelviewInverse.inverse(this.modelview);
        }

        mapVertex(x: number, y: number, z: number, coordT: Vector) {
            var m = this.modelview.m;

            coordT.x = m[0] * x + m[4] * y + m[8] * z + m[12];
            coordT.y = m[1] * x + m[5] * y + m[9] * z + m[13];
            coordT.z = m[2] * x + m[6] * y + m[10] * z + m[14];
        }

        mapVertexOrientationInverse(x: number, y: number, z: number, coordT: Vector) {
            var m = this.modelviewInverse.m;

            // NOTE: No translation is applied since this is an orientation inverse request!
            coordT.x = m[0] * x + m[4] * y + m[8] * z;
            coordT.y = m[1] * x + m[5] * y + m[9] * z;
            coordT.z = m[2] * x + m[6] * y + m[10] * z;
        }

        projectOntoTrackballSphere(p: number[], trackballSize: number) {
            var z;
            var d = Math.sqrt(p[0] * p[0] + p[1] * p[1]);
            if (d < trackballSize * 0.70710678118654752440) {
                // inside sphere
                z = Math.sqrt(trackballSize * trackballSize - d * d);
            }
            else {
                // on hyperbola 
                var t = trackballSize / 1.41421356237309504880;
                z = t * t / d;
            }

            return z;
        }

        processMouse() {
            if (this.processInteractive) {
                switch (this.interactiveType) {
                    case InteractiveType.Rotate: {
                        
                        //
                        // Trackball
                        //

                        var halfWndX = this.width * 0.5;
                        var halfWndY = this.height * 0.5;

                        var lastX = this.xStart[0] * this.devicePixelRatio();
                        var lastY = this.yStart[0] * this.devicePixelRatio();
                        var currentX = this.xEnd[0] * this.devicePixelRatio();
                        var currentY = this.yEnd[0] * this.devicePixelRatio();

                        var p0 = [(lastX - halfWndX) / halfWndX, (halfWndY - lastY) / halfWndY];
                        var p1 = [(currentX - halfWndX) / halfWndX, (halfWndY - currentY) / halfWndY];

                        if (p0[0] !== p1[0] || p0[1] !== p1[1]) {

                            var trackballSize = 0.5;

                            // temporary coord used with mapVertex and mapVertexInverseIgnoringTranslation
                            var coord: Vector = new Vector();

                            // calculate the z coordinates on the trackball sphere
                            var pTB0 = new Vector(p0[0], p0[1], this.projectOntoTrackballSphere(p0, trackballSize));
                            var pTB1 = new Vector(p1[0], p1[1], this.projectOntoTrackballSphere(p1, trackballSize));

                            // calculate inverse z coordinates on the trackball sphere based on current modelview matrix
                            this.updateMatrix();
                            this.mapVertexOrientationInverse(pTB0.x, pTB0.y, pTB0.z, coord);
                            pTB0.x = coord.x;
                            pTB0.y = coord.y;
                            pTB0.z = coord.z;
                            this.mapVertexOrientationInverse(pTB1.x, pTB1.y, pTB1.z, coord);
                            pTB1.x = coord.x;
                            pTB1.y = coord.y;
                            pTB1.z = coord.z;

                            // calculate the rotation axis via cross product between pTB0 and pTB1
                            var axis = pTB0.cross(pTB1);
                            axis.normalizeInPlace();

                            // calculate the rotation angle 
                            var t = Vector.distance(pTB0, pTB1) / (2.0 * trackballSize);
                            // clamp between -1 and 1
                            if (t > 1.0) {
                                t = 1.0;
                            } else if (t < -1.0) {
                                t = -1.0;
                            }
                            var angle = -2.0 * Math.asin(t) * 180.0/Math.PI;

                            // set new camera
                            this.modelview.identity();
                            this.modelview.rotate(angle, axis.x, axis.y, axis.z);
                            this.mapVertex(this.currentViewDirection.x, this.currentViewDirection.y, this.currentViewDirection.z, coord);
                            var viewDirection = new Vector(coord.x, coord.y, coord.z);
                            this.mapVertex(this.currentUpVector.x, this.currentUpVector.y, this.currentUpVector.z, coord);
                            var upVector = new Vector(coord.x, coord.y, coord.z);
                            this.camera.setRotation(viewDirection, upVector);

                            // update current state
                            this.xStart[0] = this.xEnd[0];
                            this.yStart[0] = this.yEnd[0];
                            this.currentViewDirection.x = this.camera.viewDirection.x;
                            this.currentViewDirection.y = this.camera.viewDirection.y;
                            this.currentViewDirection.z = this.camera.viewDirection.z;
                            this.currentUpVector.x = this.camera.upVector.x;
                            this.currentUpVector.y = this.camera.upVector.y;
                            this.currentUpVector.z = this.camera.upVector.z;
                        }

                        break;
                    }
                    case InteractiveType.Pan: {
                        this.camera.center.copy(this.currentCenter);
                        this.camera.position.copy(this.currentPosition);

                        var xDelta: number;
                        var yDelta: number;
                        if (!this.isTouchEvent) {

                            // is mouse

                            xDelta = (this.xStart[0] - this.xEnd[0]);
                            yDelta = -(this.yStart[0] - this.yEnd[0]);
                        }
                        else if (this.touchNum == 2 ||
                                (this.touchNum == 1 && this.dimensions == Dimensions.Two)) {

                            // is touch

                            xDelta = ((this.xStart[0] + this.xStart[1]) / 2.0 - (this.xEnd[0] + this.xEnd[1]) / 2.0);
                            yDelta = -((this.yStart[0] + this.yStart[1]) / 2.0 - (this.yEnd[0] + this.yEnd[1]) / 2.0);
                        }

                        xDelta *= window.devicePixelRatio;
                        yDelta *= window.devicePixelRatio;

                        this.camera.setPan(xDelta, yDelta);

                        break;
                    }
                }

                this.camera.reshape();

                this.processInteractive = false;
            }
        }

        setBackground(r: number, g: number, b: number) {
            this.backgroundColor = [r, g, b];
        }

        pushTransform() {
            this.modelview.push();
        }

        popTransform() {
            this.modelview.pop();
        }

        resizeWindow() {
            var availableWidth = window.innerWidth;
            var availableHeight = window.innerHeight;
            
            var newGraphicAreaWidth = availableWidth;
            var newGraphicAreaHeight = availableHeight - gc.graphicArea.getBoundingClientRect().top;
            if (gc.curGraphicAreaWidth != newGraphicAreaWidth ||
                gc.curGraphicAreaHeight != newGraphicAreaHeight) {
                gc.graphicArea.width = gc.curGraphicAreaWidth = newGraphicAreaWidth;
                gc.graphicArea.height = gc.curGraphicAreaHeight = newGraphicAreaHeight;
                gc.resizeWebGLGraphicArea(gc.graphicArea, gc.graphicArea.width, gc.graphicArea.height);
            }
        }

        setCurrentTime() {
            if (this.startTime == null) {
                this.startTime = new Date().getTime();
            }

            var nowTime = new Date().getTime();

            this.currentTime = (nowTime - this.startTime) / 1000;
        }

        render() {
            gc.gl.clearColor(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2], 1.0);

            gc.gl.clear(gc.gl.COLOR_BUFFER_BIT | gc.gl.DEPTH_BUFFER_BIT);

            gc.setCurrentTime();

            if (gc.calcBoundBox) {
                gc.modelview.push();
                gc.modelview.identity();
                gc.renderMode = GraphicScript.RenderMode.BoundBox;
                gc.graphicScript.graphicDisplay();
                gc.modelview.pop();
                gc.calcBoundBox = false;
            }

            // default viewDirection & viewUp
            if (this.setupCamera) {
                if (gc.dimensions == Dimensions.Two) {
                    gc.camera.viewDirection = new Vector(0.0, 0.0, -1.0);
                    gc.camera.upVector = new Vector(0.0, 1.0, 0.0);
                }
                else {
                    if (!this.hasViewDirection) {
                        gc.camera.viewDirection = new Vector(-1.3, 2.4, -2.0);
                        gc.camera.viewDirection.normalizeInPlace();
                    }

                    if (!this.hasViewUp) {
                        gc.camera.upVector = new Vector(0.0, 0.0, 1.0);
                    }
                }

                this.setupCamera = false;
            }

            if (!gc.hasZoomOrPan) {
                var bSphere = new Sphere();
                bSphere.center.x = (gc.bBox.min.x + gc.bBox.max.x) / 2.0;
                bSphere.center.y = (gc.bBox.min.y + gc.bBox.max.y) / 2.0;
                bSphere.center.z = (gc.bBox.min.z + gc.bBox.max.z) / 2.0;
                if (gc.dimensions == Dimensions.Two) {
                    var xLength = (gc.bBox.max.x - gc.bBox.min.x) / 2.0;
                    var yLength = (gc.bBox.max.y - gc.bBox.min.y) / 2.0;

                    // xLength & xLength must be greater than 0
                    if (xLength == 0 && yLength != 0) {
                        xLength = yLength;
                    }
                    else if (xLength != 0 && yLength == 0) {
                        yLength = xLength;
                    }
                    else if (xLength == 0 && yLength == 0) {
                        yLength = xLength = 5;
                    }

                    if (xLength >= yLength) {
                        if (gc.width / gc.height >= 1 &&
                            xLength / yLength >= gc.width / gc.height) {
                            bSphere.radius = xLength;
                            bSphere.radius *= gc.height / gc.width;
                        }
                        else if (gc.width / gc.height >= 1 &&
                            xLength / yLength <= gc.width / gc.height) {
                            bSphere.radius = xLength;
                            bSphere.radius *= yLength / xLength;
                        }
                        else  {
                            bSphere.radius = yLength;
                            bSphere.radius *= xLength / yLength;
                        }
                    }
                    else {
                        if (gc.height / gc.width >= 1 &&
                            yLength / xLength >= gc.height / gc.width) {
                            bSphere.radius = yLength;
                            bSphere.radius *= gc.width / gc.height;
                        }
                        else if (gc.height / gc.width >= 1 &&
                            yLength / xLength <= gc.height / gc.width) {
                            bSphere.radius = yLength;
                            bSphere.radius *= xLength / yLength;
                        }
                        else {
                            bSphere.radius = xLength;
                            bSphere.radius *= yLength / xLength;
                        }
                    }
                    gc.camera.windowSize = bSphere.radius;
                    bSphere.radius += gc.camera.unitsPerPixel() * gc.devicePixelRatio() * 30;
                }
                else {
                    bSphere.radius = Vector.distance(bSphere.center, gc.bBox.max);
                }
                if (bSphere.radius == 0) {
                    bSphere.radius = 2.5;
                }
                gc.camera.fit(bSphere);
                gc.modelBoundSphere.copy(bSphere);
            }

            gc.camera.reshape();

            gc.modelview.push();
            gc.renderMode = GraphicScript.RenderMode.Render;
            gc.graphicScript.graphicDisplay();
            gc.modelview.pop();
            if (gc.displayBoundingBox) {
                this.drawBox();
                this.drawAxes();
            }
        }

        drawBox()
        {
            var box = Graphic.make();

            box.lines();
            box.color(0.5, 0.5, 0.5);

            // don't need to re-calc boundbox for drawBox
            var saveCalcBoundBox = gc.calcBoundBox;

            if (gc.dimensions == Dimensions.Three) {
                box.vertex(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.min.z);
                box.vertex(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.min.z);

                box.vertex(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.min.z);
                box.vertex(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.min.z);

                box.vertex(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.min.z);
                box.vertex(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.max.z);

                box.vertex(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.max.z);
                box.vertex(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.max.z);

                box.vertex(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.max.z);
                box.vertex(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.max.z);

                //////////

                box.vertex(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.max.z);
                box.vertex(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.min.z);

                box.vertex(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.min.z);
                box.vertex(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.max.z);

                box.vertex(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.max.z);
                box.vertex(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.max.z);

                box.vertex(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.min.z);
                box.vertex(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.max.z);

                ///////////

                box.vertex(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.min.z);
                box.vertex(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.min.z);

                box.vertex(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.min.z);
                box.vertex(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.min.z);

                box.vertex(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.max.z);
                box.vertex(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.max.z);
            }
            else {
                box.vertex(gc.bBox.min.x, gc.bBox.min.y);
                box.vertex(gc.bBox.max.x, gc.bBox.min.y);

                box.vertex(gc.bBox.max.x, gc.bBox.min.y);
                box.vertex(gc.bBox.max.x, gc.bBox.max.y);

                box.vertex(gc.bBox.max.x, gc.bBox.max.y);
                box.vertex(gc.bBox.min.x, gc.bBox.max.y);

                box.vertex(gc.bBox.min.x, gc.bBox.max.y);
                box.vertex(gc.bBox.min.x, gc.bBox.min.y);
            }

            gc.calcBoundBox = saveCalcBoundBox;

            Graphic.draw(box);
        }

        axisNumberText(num) {
            return num.toPrecision(4).toString();
        }

        drawAxes() {
            var axisFontSize = 12;
            var scale;
            var diag = 2.0 * gc.camera.windowSize;

            if (gc.width >= gc.height) {
                scale = diag / gc.height * axisFontSize;
            }
            else {
                scale = diag / gc.width * axisFontSize;
            }

            scale *= this.devicePixelRatio();
            this.bBoxAxisText.Scale(scale, scale);

            if (gc.dimensions == Dimensions.Three) {

                this.bBoxAxisText.alignment = Text.CENTER_CENTER;
                this.bBoxAxisText.Path(1, 0);

                // X-axis
                this.bBoxAxisText.Color(1, 0, 0);
                this.bBoxAxisText.Position((gc.bBox.min.x + gc.bBox.max.x) / 2.0, gc.bBox.min.y, gc.bBox.min.z);
                this.bBoxAxisText.text = "X";
                this.bBoxAxisText.render();
                this.bBoxAxisText.Position(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.min.z);
                this.bBoxAxisText.text = this.axisNumberText(gc.bBox.min.x);
                this.bBoxAxisText.render();
                this.bBoxAxisText.Position(gc.bBox.max.x, gc.bBox.min.y, gc.bBox.min.z);
                this.bBoxAxisText.text = this.axisNumberText(gc.bBox.max.x);
                this.bBoxAxisText.render();

                // Y-axis
                this.bBoxAxisText.Color(0, 1, 0);
                this.bBoxAxisText.Position(gc.bBox.min.x, (gc.bBox.min.y + gc.bBox.max.y) / 2.0, gc.bBox.max.z);
                this.bBoxAxisText.text = "Y";
                this.bBoxAxisText.render();
                this.bBoxAxisText.Position(gc.bBox.min.x, gc.bBox.min.y, gc.bBox.max.z);
                this.bBoxAxisText.text = this.axisNumberText(gc.bBox.min.y);
                this.bBoxAxisText.render();
                this.bBoxAxisText.Position(gc.bBox.min.x, gc.bBox.max.y, gc.bBox.max.z);
                this.bBoxAxisText.text = this.axisNumberText(gc.bBox.max.y);
                this.bBoxAxisText.render();

                // Z-axis
                this.bBoxAxisText.Color(0.5, 0.5, 1);
                this.bBoxAxisText.Position(gc.bBox.max.x, gc.bBox.max.y, (gc.bBox.min.z + gc.bBox.max.z) / 2.0);
                this.bBoxAxisText.text = "Z";
                this.bBoxAxisText.render();
                this.bBoxAxisText.Position(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.min.z);
                this.bBoxAxisText.text = this.axisNumberText(gc.bBox.min.z);
                this.bBoxAxisText.render();
                this.bBoxAxisText.Position(gc.bBox.max.x, gc.bBox.max.y, gc.bBox.max.z);
                this.bBoxAxisText.text = this.axisNumberText(gc.bBox.max.z);
                this.bBoxAxisText.render();
            }
            else {
                // X-axis
                this.bBoxAxisText.Color(1, 0, 0);
                this.bBoxAxisText.Path(1, 0);
                this.bBoxAxisText.alignment = Text.LEFT_TOP;
                this.bBoxAxisText.Position(gc.bBox.min.x, gc.bBox.min.y, 0);
                this.bBoxAxisText.text = "X=" + this.axisNumberText(gc.bBox.min.x);
                this.bBoxAxisText.render();
                this.bBoxAxisText.alignment = Text.RIGHT_BOTTOM;
                this.bBoxAxisText.Position(gc.bBox.max.x, gc.bBox.max.y, 0);
                this.bBoxAxisText.text = "X=" + this.axisNumberText(gc.bBox.max.x);
                this.bBoxAxisText.render();

                // Y-axis
                this.bBoxAxisText.Color(0, 1, 0);
                this.bBoxAxisText.Path(0, 1);
                this.bBoxAxisText.alignment = Text.LEFT_BOTTOM;
                this.bBoxAxisText.Position(gc.bBox.min.x, gc.bBox.min.y, 0);
                this.bBoxAxisText.text = "Y=" + this.axisNumberText(gc.bBox.min.y);
                this.bBoxAxisText.render();
                this.bBoxAxisText.Path(0, -1);
                this.bBoxAxisText.alignment = Text.LEFT_BOTTOM;
                this.bBoxAxisText.Position(gc.bBox.max.x, gc.bBox.max.y, 0);
                this.bBoxAxisText.text = "Y=" + this.axisNumberText(gc.bBox.max.y);
                this.bBoxAxisText.render();
            }
        }
    }
}