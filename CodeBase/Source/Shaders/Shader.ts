module GraphicScript {

    export class Shader {

        constructor() {
        }

        checkCompile(shader) {
            // Check the compile status
            var compiled = gc.gl.getShaderParameter(shader, gc.gl.COMPILE_STATUS);
            if (!compiled) {
                // Something went wrong during compilation; get the error
                var lastError = gc.gl.getShaderInfoLog(shader);
                alert("ERROR: " + lastError);
            }
        }

        checkGlError(op) {
            var error;
            while ((error = gc.gl.getError()) != gc.gl.NO_ERROR) {
                alert("Shader error in: " + op);
                alert("ERROR: " + op);
            }
        }

        loadShader(type, shaderCode) {
            var shader = gc.gl.createShader(type);

            // add the source code to the shader
            gc.gl.shaderSource(shader, shaderCode);
            this.checkGlError("loadShader");

            // and compile it
            gc.gl.compileShader(shader);
            this.checkCompile(shader);

            return shader;
        }
    }
}