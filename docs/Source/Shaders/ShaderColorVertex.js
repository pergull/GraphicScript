var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GraphicScript;
(function (GraphicScript) {
    var ShaderColorVertex = /** @class */ (function (_super) {
        __extends(ShaderColorVertex, _super);
        function ShaderColorVertex() {
            var _this = _super.call(this) || this;
            _this.vertCode = "\n        uniform mat4 uModelViewProjection;\n\n        attribute vec4 aColor;\n        attribute vec4 aPosition;\n\n        // for fragment shader\n        varying vec4 vColor;\n\n        void main()\n        {\n            vColor = aColor;\n\n            // Calc vertex position\n            gl_Position = uModelViewProjection * aPosition;\n        }\n        ";
            _this.fragCode = "\n        precision highp float;\n\n        varying vec4 vColor;\n\n        void main()\n        {\n            gl_FragColor = vColor;\n        }\n        ";
            var vertexShader = _this.loadShader(gc.gl.VERTEX_SHADER, _this.vertCode);
            var fragmentShader = _this.loadShader(gc.gl.FRAGMENT_SHADER, _this.fragCode);
            _this.program = gc.gl.createProgram();
            gc.gl.attachShader(_this.program, vertexShader);
            _this.checkGlError("glAttachShader vertexShader");
            gc.gl.attachShader(_this.program, fragmentShader);
            gc.gl.linkProgram(_this.program);
            _this.checkGlError("glAttachShader fragmentShader");
            _this.aColorHandle = gc.gl.getAttribLocation(_this.program, "aColor");
            _this.checkGlError("glGetAttribLocation aColor");
            _this.aPositionHandle = gc.gl.getAttribLocation(_this.program, "aPosition");
            _this.checkGlError("glGetAttribLocation aPosition");
            _this.uModelViewProjectionHandle = gc.gl.getUniformLocation(_this.program, "uModelViewProjection");
            _this.checkGlError("uModelViewProjection");
            return _this;
        }
        ShaderColorVertex.prototype.updateModelViewProjection = function (matrix) {
            gc.gl.uniformMatrix4fv(this.uModelViewProjectionHandle, false, matrix);
        };
        ShaderColorVertex.prototype.bind = function (arrayBufferId) {
            this.useProgram();
            gc.gl.bindBuffer(gc.gl.ARRAY_BUFFER, arrayBufferId);
            gc.gl.vertexAttribPointer(this.aColorHandle, 3, gc.gl.FLOAT, false, 28, 0);
            gc.gl.enableVertexAttribArray(this.aColorHandle);
            gc.gl.vertexAttribPointer(this.aPositionHandle, 3, gc.gl.FLOAT, false, 28, 16);
            gc.gl.enableVertexAttribArray(this.aPositionHandle);
        };
        ShaderColorVertex.prototype.useProgram = function () {
            gc.gl.useProgram(this.program);
        };
        return ShaderColorVertex;
    }(GraphicScript.Shader));
    GraphicScript.ShaderColorVertex = ShaderColorVertex;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=ShaderColorVertex.js.map