module GraphicScript {

    export class Camera {

        position = new Vector();
        viewDirection: Vector;
        upVector: Vector;
        targetDistance: number;
        windowSize;
        center = new Vector();
        perspective = false;

        winUnitsX: number;
        winUnitsY: number;

        perspectivePosition: Vector;
        perspectiveTargetDistance: number;
        parallelPosition: Vector;
        parallelTargetDistance: number;

        constructor(viewDirection: Vector, upVector: Vector) {
            this.viewDirection = viewDirection;
            this.upVector = upVector;
        }

        unitsPerPixel() {
            var lengthScene = this.windowSize * 2;
            var lengthPixels = gc.width < gc.height ? gc.width : gc.height;

            return lengthScene / lengthPixels;
        }

        setViewDirection(x: number, y: number, z: number) {
            this.viewDirection.x = x;
            this.viewDirection.y = y;
            this.viewDirection.z = z;
        }

        setUpVector(x: number, y: number, z: number) {
            this.upVector.x = x;
            this.upVector.y = y;
            this.upVector.z = z;
        }

        setRotation(viewDirection: Vector, upVector: Vector) {
            this.viewDirection = viewDirection;
            this.upVector = upVector;
            this.position = this.center.subtract(this.viewDirection.scale(this.targetDistance));
        }

        setPan(dx: number, dy: number) {
            var xAxis = this.upVector.cross(this.viewDirection).normalizeInPlace();
            var yAxis = this.viewDirection.cross(xAxis).normalizeInPlace();

            var scale = this.unitsPerPixel();
            var deltaX = -dx * scale;
            var deltaY = dy * scale;

            this.center = this.center.add(xAxis.scale(deltaX));
            this.center = this.center.add(yAxis.scale(deltaY));
            this.position = this.position.add(xAxis.scale(deltaX));
            this.position = this.position.add(yAxis.scale(deltaY));

            gc.hasZoomOrPan = true;
        }

        zoom(zoomFactor: number) {
            this.windowSize *= zoomFactor;
            this.reshape();

            gc.hasZoomOrPan = true;
        }

        fit(bSphere: Sphere) {
            this.center.copy(bSphere.center);
            this.windowSize = bSphere.radius;
            this.targetDistance = this.windowSize;
            this.position = this.center.subtract(this.viewDirection.scale(this.targetDistance));
            this.reshape();
        }

        reshape() {
            var width = gc.width;
            var height = gc.height;
            var radius = this.windowSize;

            gc.gl.viewport(0, 0, width, height);

            // setup window units
            if (width >= height) {
                this.winUnitsX = 2 * radius * width / height;
                this.winUnitsY = 2 * radius;
            }
            else {
                this.winUnitsX = 2 * radius;
                this.winUnitsY = 2 * radius * height / width;
            }

            // reshape camera type
            if (this.perspective) {
                this.reshapePerspective();
            }
            else {
                this.reshapeParallel();
            }

            // setup modelview lookAt
            var position;
            if (this.perspective) {
                position = this.perspectivePosition;
            }
            else {
                position = this.parallelPosition;
            }
            gc.modelview.identity();
            gc.modelview.lookAt(position.x, position.y, position.z,
                this.center.x, this.center.y, this.center.z,
                this.upVector.x, this.upVector.y, this.upVector.z);
        }

        reshapePerspective() {

            // controls
            var clipOffsetFactor = 10;
            var perspectiveFactor = 3;

            var width = gc.width;
            var height = gc.height;
            var radius = this.windowSize;

            var centerOffset = Vector.distance(this.center, gc.modelBoundSphere.center);

            this.perspectiveTargetDistance = radius * perspectiveFactor;
            this.perspectivePosition = this.center;
            this.perspectivePosition = this.perspectivePosition.subtract(this.viewDirection.scale(this.perspectiveTargetDistance));

            var near = this.perspectiveTargetDistance / 10;
            var far = this.perspectiveTargetDistance + centerOffset + gc.modelBoundSphere.radius * 2;
            far *= clipOffsetFactor;

            var fovy = 2.0 * 180.0 / Math.PI * Math.atan(radius / this.perspectiveTargetDistance);

            gc.projection.identity();
            if (width >= height) {
                gc.projection.perspective(fovy, this.winUnitsX / this.winUnitsY, near, far);
            }
            else {
                var radiusModified = radius * this.winUnitsY / this.winUnitsX;
                var fovyModified = Math.atan(radiusModified / this.perspectiveTargetDistance) * 180.0 / Math.PI * 2.0;
                gc.projection.perspective(fovyModified, this.winUnitsX / this.winUnitsY, near, far);
            }
        }

        reshapeParallel() {

            // controls
            var clipOffsetFactor = 10;

            var width = gc.width;
            var height = gc.height;
            var radius = this.windowSize;

            var centerOffset = Vector.distance(this.center, gc.modelBoundSphere.center);

            this.parallelTargetDistance = centerOffset + gc.modelBoundSphere.radius;
            this.parallelTargetDistance *= clipOffsetFactor;
            this.parallelPosition = this.center;
            this.parallelPosition = this.parallelPosition.subtract(this.viewDirection.scale(this.parallelTargetDistance));

            var near = 0;
            var far = this.parallelTargetDistance * 2;

            gc.projection.identity();
            gc.projection.ortho(
                -this.winUnitsX / 2.0, this.winUnitsX / 2.0,
                -this.winUnitsY / 2.0, this.winUnitsY / 2.0,
                near, far);
        }

        setCamera(eye: number[], target: number[], up: number[], windowSize: number) {
            this.position.x = eye[0];
            this.position.y = eye[1];
            this.position.z = eye[2];

            this.center.x = target[0];
            this.center.y = target[1];
            this.center.z = target[2];

            this.targetDistance = Vector.distance(this.position, this.center);

            this.upVector.x = up[0];
            this.upVector.y = up[1];
            this.upVector.z = up[2];

            var dx = this.center.x - this.position.x;
            var dy = this.center.y - this.position.y;
            var dz = this.center.z - this.position.z;
            this.viewDirection = new Vector(dx, dy, dz);
            this.viewDirection.normalizeInPlace();

            this.windowSize = windowSize;

            this.reshape();
        }
    }
}