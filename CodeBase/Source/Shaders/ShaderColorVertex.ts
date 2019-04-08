module GraphicScript {

    export class ShaderColorVertex extends Shader {
        vertCode = `
        uniform mat4 uModelViewProjection;

        attribute vec4 aColor;
        attribute vec4 aPosition;

        // for fragment shader
        varying vec4 vColor;

        void main()
        {
            vColor = aColor;

            // Calc vertex position
            gl_Position = uModelViewProjection * aPosition;
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

        uModelViewProjectionHandle;

        aPositionHandle;
        aColorHandle;

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

            this.aPositionHandle = gc.gl.getAttribLocation(this.program, "aPosition");
            this.checkGlError("glGetAttribLocation aPosition");

            this.uModelViewProjectionHandle = gc.gl.getUniformLocation(this.program, "uModelViewProjection");
            this.checkGlError("uModelViewProjection");
        }

        updateModelViewProjection(matrix) {
            gc.gl.uniformMatrix4fv(this.uModelViewProjectionHandle, false, matrix);
        }

        bind(arrayBufferId) {
            this.useProgram();

            gc.gl.bindBuffer(gc.gl.ARRAY_BUFFER, arrayBufferId);

            gc.gl.vertexAttribPointer(this.aColorHandle, 3, gc.gl.FLOAT, false, 28, 0);
            gc.gl.enableVertexAttribArray(this.aColorHandle);

            gc.gl.vertexAttribPointer(this.aPositionHandle, 3, gc.gl.FLOAT, false, 28, 16);
            gc.gl.enableVertexAttribArray(this.aPositionHandle);
        }

        useProgram() {
            gc.gl.useProgram(this.program);
        }
    }
}