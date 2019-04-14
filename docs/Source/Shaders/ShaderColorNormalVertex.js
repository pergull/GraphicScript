var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GraphicScript;
(function (GraphicScript) {
    var ShaderColorNormalVertex = (function (_super) {
        __extends(ShaderColorNormalVertex, _super);
        function ShaderColorNormalVertex() {
            var _this = _super.call(this) || this;
            _this.vertCode = "\n        uniform mat4 uModelViewInverse;\n        uniform mat4 uModelViewProjection;\n        uniform int uRainbowLight;\n\n        attribute vec4 aColor;\n        attribute vec3 aNormal;\n        attribute vec4 aPosition;\n\n        // for fragment shader\n        varying vec4 vColor;\n\n        void clip(); // pergull???\n\n        void main()\n        {\n            if(uRainbowLight == 0)\n            {\n                // Directional light\n                vec3 light = vec3(0.0, 0.0, 1.0);\n\n                // Normal at this vertex\n                vec3 normal = vec3(vec4(aNormal, 0.0) * uModelViewInverse);\n\n                // Init color with ambient light\n                vColor.r = 0.04;\n                vColor.g = 0.04;\n                vColor.b = 0.04;\n                vColor.a = 1.0;\n\n                // Adjust color based on angle between light and normal\n                float light_dot_normal = dot(light, normal);\n                if (light_dot_normal > 0.0) {\n                    vColor += aColor * light_dot_normal;\n                }\n                else {\n                    vColor -= aColor * light_dot_normal;\n                }\n                vColor = clamp(vColor, 0.0, 1.0);\n\n                // Calc vertex position\n                gl_Position = uModelViewProjection * aPosition;\n            }\n            else\n            {\n                // Directional lights\n                vec3 lightR = vec3(0.707107, 0.0, 0.707107);\n                vec3 lightG = vec3(0.57735, 0.57735, 0.57735);\n                vec3 lightB = vec3(0.0, 0.707107, 0.707107);\n\n                // Normal at this vertex\n                vec3 normal = vec3(vec4(aNormal, 0.0) * uModelViewInverse);\n\n                // Init color with ambient light\n                vColor.r = 0.04;\n                vColor.g = 0.04;\n                vColor.b = 0.04;\n                vColor.a = 1.0;\n\n                float light_dot_normalR = dot(lightR, normal);\n                if(light_dot_normalR > 0.0)\n                {\n                    vColor.r += aColor.r * light_dot_normalR;\n                }\n                else\n                {\n                    vColor.r -= aColor.r * light_dot_normalR;\n                }\n\n                float light_dot_normalG = dot(lightG, normal);\n                if (light_dot_normalG > 0.0) {\n                    vColor.g += aColor.g * light_dot_normalG;\n                }\n                else {\n                    vColor.g -= aColor.g * light_dot_normalG;\n                }\n\n                float light_dot_normalB = dot(lightB, normal);\n                if (light_dot_normalB > 0.0) {\n                    vColor.b += aColor.b * light_dot_normalB;\n                }\n                else {\n                    vColor.b -= aColor.b * light_dot_normalB;\n                }\n\n                vColor = clamp(vColor, 0.0, 1.0);\n\n                // Calc vertex position\n                gl_Position = uModelViewProjection * aPosition;\n            }\n        }\n        ";
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
            _this.aNormalHandle = gc.gl.getAttribLocation(_this.program, "aNormal");
            _this.checkGlError("glGetAttribLocation aNormal");
            _this.aPositionHandle = gc.gl.getAttribLocation(_this.program, "aPosition");
            _this.checkGlError("glGetAttribLocation aPosition");
            _this.uModelViewInverseHandle = gc.gl.getUniformLocation(_this.program, "uModelViewInverse");
            _this.checkGlError("uModelViewInverse");
            _this.uModelViewProjectionHandle = gc.gl.getUniformLocation(_this.program, "uModelViewProjection");
            _this.checkGlError("uModelViewProjection");
            _this.uRainbowLightHandle = gc.gl.getUniformLocation(_this.program, "uRainbowLight");
            _this.checkGlError("uRainbowLight");
            return _this;
        }
        ShaderColorNormalVertex.prototype.updateModelViewInverse = function (matrix) {
            gc.gl.uniformMatrix4fv(this.uModelViewInverseHandle, false, matrix);
        };
        ShaderColorNormalVertex.prototype.updateModelViewProjection = function (matrix) {
            gc.gl.uniformMatrix4fv(this.uModelViewProjectionHandle, false, matrix);
        };
        ShaderColorNormalVertex.prototype.updateRainbowLight = function (enabled) {
            gc.gl.uniform1i(this.uRainbowLightHandle, enabled);
        };
        ShaderColorNormalVertex.prototype.bind = function (arrayBufferId) {
            this.useProgram();
            gc.gl.bindBuffer(gc.gl.ARRAY_BUFFER, arrayBufferId);
            gc.gl.vertexAttribPointer(this.aColorHandle, 3, gc.gl.FLOAT, false, 40, 0);
            gc.gl.enableVertexAttribArray(this.aColorHandle);
            gc.gl.vertexAttribPointer(this.aNormalHandle, 3, gc.gl.FLOAT, false, 40, 16);
            gc.gl.enableVertexAttribArray(this.aNormalHandle);
            gc.gl.vertexAttribPointer(this.aPositionHandle, 3, gc.gl.FLOAT, false, 40, 28);
            gc.gl.enableVertexAttribArray(this.aPositionHandle);
        };
        ShaderColorNormalVertex.prototype.useProgram = function () {
            gc.gl.useProgram(this.program);
        };
        return ShaderColorNormalVertex;
    }(GraphicScript.Shader));
    GraphicScript.ShaderColorNormalVertex = ShaderColorNormalVertex;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=ShaderColorNormalVertex.js.map