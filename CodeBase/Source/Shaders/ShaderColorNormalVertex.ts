module GraphicScript {

    export class ShaderColorNormalVertex extends Shader {

        vertCode = `
        uniform mat4 uModelViewInverse;
        uniform mat4 uModelViewProjection;
        uniform int uRainbowLight;

        attribute vec4 aColor;
        attribute vec3 aNormal;
        attribute vec4 aPosition;

        // for fragment shader
        varying vec4 vColor;

        void clip(); // pergull???

        void main()
        {
            if(uRainbowLight == 0)
            {
                // Directional light
                vec3 light = vec3(0.0, 0.0, 1.0);

                // Normal at this vertex
                vec3 normal = vec3(vec4(aNormal, 0.0) * uModelViewInverse);

                // Init color with ambient light
                vColor.r = 0.04;
                vColor.g = 0.04;
                vColor.b = 0.04;
                vColor.a = 1.0;

                // Adjust color based on angle between light and normal
                float light_dot_normal = dot(light, normal);
                if (light_dot_normal > 0.0) {
                    vColor += aColor * light_dot_normal;
                }
                else {
                    vColor -= aColor * light_dot_normal;
                }
                vColor = clamp(vColor, 0.0, 1.0);

                // Calc vertex position
                gl_Position = uModelViewProjection * aPosition;
            }
            else
            {
                // Directional lights
                vec3 lightR = vec3(0.707107, 0.0, 0.707107);
                vec3 lightG = vec3(0.57735, 0.57735, 0.57735);
                vec3 lightB = vec3(0.0, 0.707107, 0.707107);

                // Normal at this vertex
                vec3 normal = vec3(vec4(aNormal, 0.0) * uModelViewInverse);

                // Init color with ambient light
                vColor.r = 0.04;
                vColor.g = 0.04;
                vColor.b = 0.04;
                vColor.a = 1.0;

                float light_dot_normalR = dot(lightR, normal);
                if(light_dot_normalR > 0.0)
                {
                    vColor.r += aColor.r * light_dot_normalR;
                }
                else
                {
                    vColor.r -= aColor.r * light_dot_normalR;
                }

                float light_dot_normalG = dot(lightG, normal);
                if (light_dot_normalG > 0.0) {
                    vColor.g += aColor.g * light_dot_normalG;
                }
                else {
                    vColor.g -= aColor.g * light_dot_normalG;
                }

                float light_dot_normalB = dot(lightB, normal);
                if (light_dot_normalB > 0.0) {
                    vColor.b += aColor.b * light_dot_normalB;
                }
                else {
                    vColor.b -= aColor.b * light_dot_normalB;
                }

                vColor = clamp(vColor, 0.0, 1.0);

                // Calc vertex position
                gl_Position = uModelViewProjection * aPosition;
            }
        }
        `;

        fragCode = `
        precision highp float;

        varying vec4 vColor;

        void main()
        {
            gl_FragColor = vColor;
        }
        `;

        program;

        uModelViewInverseHandle;
        uModelViewProjectionHandle;
        uRainbowLightHandle;

        aColorHandle;
        aNormalHandle;
        aPositionHandle;

        constructor() {
            super();

            var vertexShader = this.loadShader(gc.gl.VERTEX_SHADER, this.vertCode);
            var fragmentShader = this.loadShader(gc.gl.FRAGMENT_SHADER, this.fragCode);

            this.program = gc.gl.createProgram();
            gc.gl.attachShader(this.program, vertexShader);
            this.checkGlError("glAttachShader vertexShader");
            gc.gl.attachShader(this.program, fragmentShader);
            gc.gl.linkProgram(this.program);
            this.checkGlError("glAttachShader fragmentShader");

            this.aColorHandle = gc.gl.getAttribLocation(this.program, "aColor");
            this.checkGlError("glGetAttribLocation aColor");

            this.aNormalHandle = gc.gl.getAttribLocation(this.program, "aNormal");
            this.checkGlError("glGetAttribLocation aNormal");

            this.aPositionHandle = gc.gl.getAttribLocation(this.program, "aPosition");
            this.checkGlError("glGetAttribLocation aPosition");

            this.uModelViewInverseHandle = gc.gl.getUniformLocation(this.program, "uModelViewInverse");
            this.checkGlError("uModelViewInverse");

            this.uModelViewProjectionHandle = gc.gl.getUniformLocation(this.program, "uModelViewProjection");
            this.checkGlError("uModelViewProjection");

            this.uRainbowLightHandle = gc.gl.getUniformLocation(this.program, "uRainbowLight");
            this.checkGlError("uRainbowLight");
        }

        updateModelViewInverse(matrix) {
            gc.gl.uniformMatrix4fv(this.uModelViewInverseHandle, false, matrix);
        }

        updateModelViewProjection(matrix) {
            gc.gl.uniformMatrix4fv(this.uModelViewProjectionHandle, false, matrix);
        }

        updateRainbowLight(enabled) {
            gc.gl.uniform1i(this.uRainbowLightHandle, enabled);
        }

        bind(arrayBufferId) {
            this.useProgram();

            gc.gl.bindBuffer(gc.gl.ARRAY_BUFFER, arrayBufferId);

            gc.gl.vertexAttribPointer(this.aColorHandle, 3, gc.gl.FLOAT, false, 40, 0);
            gc.gl.enableVertexAttribArray(this.aColorHandle);

            gc.gl.vertexAttribPointer(this.aNormalHandle, 3, gc.gl.FLOAT, false, 40, 16);
            gc.gl.enableVertexAttribArray(this.aNormalHandle);

            gc.gl.vertexAttribPointer(this.aPositionHandle, 3, gc.gl.FLOAT, false, 40, 28);
            gc.gl.enableVertexAttribArray(this.aPositionHandle);
        }

        useProgram() {
            gc.gl.useProgram(this.program);
        }
    }
}