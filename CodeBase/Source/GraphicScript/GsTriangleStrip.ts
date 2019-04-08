module GraphicScript {

    export class GsTriangleStrip extends GsTriangles {

        constructor() {
            super();
        }

        vertex(x: number, y: number, z: number) {
            if (this.vertexData.length > 8) {
                var x0Index = this.vertexData.length - 6;
                var x1Index = this.vertexData.length - 3;
        
                var x0 = this.vertexData[x0Index];
                var y0 = this.vertexData[x0Index + 1];
                var z0 = this.vertexData[x0Index + 2];
        
                var x1 = this.vertexData[x1Index];
                var y1 = this.vertexData[x1Index + 1];
                var z1 = this.vertexData[x1Index + 2];
        
                super.vertex(x0, y0, z0);
                super.vertex(x1, y1, z1);
                super.vertex(x, y, z);
            }
            else {
                super.vertex(x, y, z);
            }
        }
    }
}