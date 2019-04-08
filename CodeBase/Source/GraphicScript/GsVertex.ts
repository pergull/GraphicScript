module GraphicScript {

    export class GsVertex {

        arrayBufferId: WebGLBuffer;
        arrayBuffer: Float32Array;
        arrayBufferDirty = true;

        vertexData: number[] = [];
        colorData: number[] = [];
        normalData: number[] = [];
        updateNormals: boolean;
        currentColor = new Color();

        hasRadius = false;
        currentRadius = 1;
        radiusData: number[] = [];

        hasTextSize = false;
        currentTextSize = 1;
        textSizeData: number[] = [];

        rainbowLight = false;

        constructor() {
        }

        setDefaultValues() {
            this.currentColor.setDefault();

            this.hasRadius = false;
            this.currentRadius = 1;
            this.radiusData = [];

            this.hasTextSize = false;
            this.currentTextSize = 1;
            this.textSizeData = [];

            this.rainbowLight = false;
        }

        vertex(x: number, y: number, z: number) {
            this.vertexData.push(x);
            this.vertexData.push(y);
            this.vertexData.push(z);

            this.colorData.push(this.currentColor.r);
            this.colorData.push(this.currentColor.g);
            this.colorData.push(this.currentColor.b);
            this.colorData.push(this.currentColor.a);

            if (this.hasRadius) {
                this.radiusData.push(this.currentRadius);
            }

            if (this.hasTextSize) {
                this.textSizeData.push(this.currentTextSize);
            }

            this.updateNormals = true;
        }

        color(r: number, g: number, b: number, a: number) {
            this.currentColor.set(r, g, b, a);
        }

        radius(r: number) {
            this.currentRadius = r;
        }

        textSize(size: number) {
            this.currentTextSize = size;
        }

        render() {
            console.log("render virtual");
        }

        calcBoundBox() {
            var vT = [];
    
            var index = 0;
            for (var i = 0; i < this.vertexData.length; i += 3) {
                this.mapVertex(this.vertexData[index++], this.vertexData[index++], this.vertexData[index++], vT);
                if (vT[0] < gc.bBox.min.x) { gc.bBox.min.x = vT[0]; }
                if (vT[1] < gc.bBox.min.y) { gc.bBox.min.y = vT[1]; }
                if (vT[2] < gc.bBox.min.z) { gc.bBox.min.z = vT[2]; }
                if (vT[0] > gc.bBox.max.x) { gc.bBox.max.x = vT[0]; }
                if (vT[1] > gc.bBox.max.y) { gc.bBox.max.y = vT[1]; }
                if (vT[2] > gc.bBox.max.z) { gc.bBox.max.z = vT[2]; }
            }
        }

        calcNormals() {
            this.normalData = [];
    
            for (var i = 0; i < this.vertexData.length; i += 9) {
                var v0 = [this.vertexData[i], this.vertexData[i + 1], this.vertexData[i + 2]];
                var v1 = [this.vertexData[i + 3], this.vertexData[i + 4], this.vertexData[i + 5]];
                var v2 = [this.vertexData[i + 6], this.vertexData[i + 7], this.vertexData[i + 8]];
        
                var n = [];
                this.calcNormal(v0, v1, v2, n);

                this.normalData.push(n[0]);
                this.normalData.push(n[1]);
                this.normalData.push(n[2]);

                this.normalData.push(n[0]);
                this.normalData.push(n[1]);
                this.normalData.push(n[2]);

                this.normalData.push(n[0]);
                this.normalData.push(n[1]);
                this.normalData.push(n[2]);
            }

            this.updateNormals = false;
        }

        calcNormal(c0: number[], c1: number[], c2: number[], n: number[]) {
            var u0 = c2[0] - c1[0];
            var u1 = c2[1] - c1[1];
            var u2 = c2[2] - c1[2];

            var v0 = c0[0] - c1[0];
            var v1 = c0[1] - c1[1];
            var v2 = c0[2] - c1[2];

            n[0] = u1 * v2 - u2 * v1;
            n[1] = -(u0 * v2 - u2 * v0);
            n[2] = u0 * v1 - u1 * v0;

            // normalize
            var r;
            r = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
            if (r > 0.0000001) {
                n[0] /= r;
                n[1] /= r;
                n[2] /= r;
            }
        }

        mapVertex(x: number, y: number, z: number, vT: number[]) {
            var m = gc.modelview.m;

            vT[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            vT[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            vT[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
        }

        updateArrayBuffer() {

            if (this.normalData.length > 0) {

                this.arrayBuffer = new Float32Array(this.vertexData.length * 10); // 3 vertex + 3 normal + 4 color = 10

                var arrayBufferIndex = 0
                this.rainbowLight = true;
                for (var i = 0; i < this.vertexData.length/3; i++) {

                    // if color has been defined, then turn off rainbowLight
                    if (this.colorData[i * 4] != -1 || this.colorData[i * 4 + 1] != -1 || this.colorData[i * 4 + 2] != -1) {
                        this.rainbowLight = false;
                        this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4];
                        this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4 + 1];
                        this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4 + 2];
                    }
                    else {
                        this.arrayBuffer[arrayBufferIndex++] = 1;
                        this.arrayBuffer[arrayBufferIndex++] = 1;
                        this.arrayBuffer[arrayBufferIndex++] = 1;
                    }

                    this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4 + 3];
                    this.arrayBuffer[arrayBufferIndex++] = this.normalData[i * 3];
                    this.arrayBuffer[arrayBufferIndex++] = this.normalData[i * 3 + 1];
                    this.arrayBuffer[arrayBufferIndex++] = this.normalData[i * 3 + 2];
                    this.arrayBuffer[arrayBufferIndex++] = this.vertexData[i * 3];
                    this.arrayBuffer[arrayBufferIndex++] = this.vertexData[i * 3 + 1];
                    this.arrayBuffer[arrayBufferIndex++] = this.vertexData[i * 3 + 2];
                }

                this.arrayBufferId = gc.gl.createBuffer();
                gc.gl.bindBuffer(gc.gl.ARRAY_BUFFER, this.arrayBufferId);
                gc.gl.bufferData(gc.gl.ARRAY_BUFFER, this.arrayBuffer, gc.gl.STATIC_DRAW);
            }
            else {
                this.arrayBuffer = new Float32Array(this.vertexData.length * 7); // 3 vertex + 4 color = 7

                var arrayBufferIndex = 0
                for (var i = 0; i < this.vertexData.length; i++) {

                    // if color has been defined, then turn off rainbowLight
                    if (this.colorData[i * 4] != -1 || this.colorData[i * 4 + 1] != -1 || this.colorData[i * 4 + 2] != -1) {
                        this.rainbowLight = false;
                        this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4];
                        this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4 + 1];
                        this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4 + 2];
                    }
                    else {
                        this.arrayBuffer[arrayBufferIndex++] = 1;
                        this.arrayBuffer[arrayBufferIndex++] = 1;
                        this.arrayBuffer[arrayBufferIndex++] = 1;
                    }

                    this.arrayBuffer[arrayBufferIndex++] = this.colorData[i * 4 + 3];
                    this.arrayBuffer[arrayBufferIndex++] = this.vertexData[i * 3];
                    this.arrayBuffer[arrayBufferIndex++] = this.vertexData[i * 3 + 1];
                    this.arrayBuffer[arrayBufferIndex++] = this.vertexData[i * 3 + 2];
                }

                this.arrayBufferId = gc.gl.createBuffer();
                gc.gl.bindBuffer(gc.gl.ARRAY_BUFFER, this.arrayBufferId);
                gc.gl.bufferData(gc.gl.ARRAY_BUFFER, this.arrayBuffer, gc.gl.STATIC_DRAW);
            }

            this.arrayBufferDirty = false;
        }
    }
}