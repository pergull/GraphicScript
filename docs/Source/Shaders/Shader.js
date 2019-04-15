var GraphicScript;
(function (GraphicScript) {
    var Shader = /** @class */ (function () {
        function Shader() {
        }
        Shader.prototype.checkCompile = function (shader) {
            // Check the compile status
            var compiled = gc.gl.getShaderParameter(shader, gc.gl.COMPILE_STATUS);
            if (!compiled) {
                // Something went wrong during compilation; get the error
                var lastError = gc.gl.getShaderInfoLog(shader);
                alert("ERROR: " + lastError);
            }
        };
        Shader.prototype.checkGlError = function (op) {
            var error;
            while ((error = gc.gl.getError()) != gc.gl.NO_ERROR) {
                alert("Shader error in: " + op);
                alert("ERROR: " + op);
            }
        };
        Shader.prototype.loadShader = function (type, shaderCode) {
            var shader = gc.gl.createShader(type);
            // add the source code to the shader
            gc.gl.shaderSource(shader, shaderCode);
            this.checkGlError("loadShader");
            // and compile it
            gc.gl.compileShader(shader);
            this.checkCompile(shader);
            return shader;
        };
        return Shader;
    }());
    GraphicScript.Shader = Shader;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=Shader.js.map