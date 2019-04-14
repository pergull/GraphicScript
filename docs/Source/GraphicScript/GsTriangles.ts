module GraphicScript {

    export class GsTriangles extends GsVertex {

        constructor() {
            super();
        }

        render() {
            switch (gc.renderMode) {
                case RenderMode.Render:
                    {
                        if (this.updateNormals) {
                            this.calcNormals();
                        }

                        if (this.arrayBufferDirty) {
                            this.updateArrayBuffer();
                        }

                        gc.shaderColorNormalVertex.bind(this.arrayBufferId);
                        gc.shaderColorNormalVertex.updateModelViewProjection(gc.modelViewProjection.m);
                        gc.shaderColorNormalVertex.updateModelViewInverse(gc.modelviewInverse.m);
                        gc.shaderColorNormalVertex.updateRainbowLight(this.rainbowLight);
                        gc.gl.drawArrays(gc.gl.TRIANGLES, 0, this.vertexData.length);

                        break;
                    }

                case RenderMode.BoundBox:
                    {
                        this.calcBoundBox();
                        break;
                    }
            }
        }
    }
}