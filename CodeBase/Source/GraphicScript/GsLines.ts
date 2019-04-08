module GraphicScript {

    export class GsLines extends GsVertex {

        constructor() {
            super();
        }

        render() {
            switch (gc.renderMode) {
                case RenderMode.Render:
                    {
                        if (this.arrayBufferDirty) {
                            this.updateArrayBuffer();
                        }

                        gc.shaderColorVertex.bind(this.arrayBufferId);
                        gc.shaderColorVertex.updateModelViewProjection(gc.modelViewProjection.m);
                        gc.gl.drawArrays(gc.gl.LINES, 0, this.vertexData.length);

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