var GraphicScript;
(function (GraphicScript) {
    var GsVertex = (function () {
        function GsVertex() {
            this.arrayBufferDirty = true;
            this.vertexData = [];
            this.colorData = [];
            this.normalData = [];
            this.currentColor = new GraphicScript.Color();
            this.hasRadius = false;
            this.currentRadius = 1;
            this.radiusData = [];
            this.hasTextSize = false;
            this.currentTextSize = 1;
            this.textSizeData = [];
            this.rainbowLight = false;
        }
        GsVertex.prototype.setDefaultValues = function () {
            this.currentColor.setDefault();
            this.hasRadius = false;
            this.currentRadius = 1;
            this.radiusData = [];
            this.hasTextSize = false;
            this.currentTextSize = 1;
            this.textSizeData = [];
            this.rainbowLight = false;
        };
        GsVertex.prototype.vertex = function (x, y, z) {
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
        };
        GsVertex.prototype.color = function (r, g, b, a) {
            this.currentColor.set(r, g, b, a);
        };
        GsVertex.prototype.radius = function (r) {
            this.currentRadius = r;
        };
        GsVertex.prototype.textSize = function (size) {
            this.currentTextSize = size;
        };
        GsVertex.prototype.render = function () {
            console.log("render virtual");
        };
        GsVertex.prototype.calcBoundBox = function () {
            var vT = [];
            var index = 0;
            for (var i = 0; i < this.vertexData.length; i += 3) {
                this.mapVertex(this.vertexData[index++], this.vertexData[index++], this.vertexData[index++], vT);
                if (vT[0] < gc.bBox.min.x) {
                    gc.bBox.min.x = vT[0];
                }
                if (vT[1] < gc.bBox.min.y) {
                    gc.bBox.min.y = vT[1];
                }
                if (vT[2] < gc.bBox.min.z) {
                    gc.bBox.min.z = vT[2];
                }
                if (vT[0] > gc.bBox.max.x) {
                    gc.bBox.max.x = vT[0];
                }
                if (vT[1] > gc.bBox.max.y) {
                    gc.bBox.max.y = vT[1];
                }
                if (vT[2] > gc.bBox.max.z) {
                    gc.bBox.max.z = vT[2];
                }
            }
        };
        GsVertex.prototype.calcNormals = function () {
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
        };
        GsVertex.prototype.calcNormal = function (c0, c1, c2, n) {
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
        };
        GsVertex.prototype.mapVertex = function (x, y, z, vT) {
            var m = gc.modelview.m;
            vT[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
            vT[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
            vT[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
        };
        GsVertex.prototype.updateArrayBuffer = function () {
            if (this.normalData.length > 0) {
                this.arrayBuffer = new Float32Array(this.vertexData.length * 10); // 3 vertex + 3 normal + 4 color = 10
                var arrayBufferIndex = 0;
                this.rainbowLight = true;
                for (var i = 0; i < this.vertexData.length / 3; i++) {
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
                var arrayBufferIndex = 0;
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
        };
        return GsVertex;
    }());
    GraphicScript.GsVertex = GsVertex;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsVertex.js.map