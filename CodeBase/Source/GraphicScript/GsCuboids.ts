module GraphicScript {

    export class GsCuboids extends GsVertex {

        graphic = new GsGraphic();
        build = true;

        constructor() {
            super();
        }

        render() {
            if (this.build) {
                this.doBuild();
            }

            this.graphic.render();
        }

        doBuild() {
            var colorIndex;
            var vertexIndex;
            for (vertexIndex = 0, colorIndex = 0;
                vertexIndex + 5 < this.vertexData.length;
                vertexIndex += 6, colorIndex += 8) {
                var x0 = this.vertexData[vertexIndex + 0];
                var y0 = this.vertexData[vertexIndex + 1];
                var z0 = this.vertexData[vertexIndex + 2];
                var x1 = this.vertexData[vertexIndex + 3];
                var y1 = this.vertexData[vertexIndex + 4];
                var z1 = this.vertexData[vertexIndex + 5];

                var dx = x1 - x0;
                var dy = y1 - y0;
                var dz = z1 - z0;

                this.graphic.color(this.colorData[colorIndex + 0], this.colorData[colorIndex + 1], this.colorData[colorIndex + 2], this.colorData[colorIndex + 3]);

                this.graphic.triangleFan();
                this.graphic.vertex(x0, y0, z0);
                this.graphic.vertex(x0 + dx, y0, z0);
                this.graphic.vertex(x0 + dx, y0 + dy, z0);
                this.graphic.vertex(x0, y0 + dy, z0);

                this.graphic.triangleFan();
                this.graphic.vertex(x0, y0, z0);
                this.graphic.vertex(x0, y0 + dy, z0);
                this.graphic.vertex(x0, y0 + dy, z0 + dz);
                this.graphic.vertex(x0, y0, z0 + dz);

                this.graphic.triangleFan();
                this.graphic.vertex(x0, y0, z0);
                this.graphic.vertex(x0 + dx, y0, z0);
                this.graphic.vertex(x0 + dx, y0, z0 + dz);
                this.graphic.vertex(x0, y0, z0 + dz);

                this.graphic.triangleFan();
                this.graphic.vertex(x1, y1, z1);
                this.graphic.vertex(x1 - dx, y1, z1);
                this.graphic.vertex(x1 - dx, y1 - dy, z1);
                this.graphic.vertex(x1, y1 - dy, z1);

                this.graphic.triangleFan();
                this.graphic.vertex(x1, y1, z1);
                this.graphic.vertex(x1, y1 - dy, z1);
                this.graphic.vertex(x1, y1 - dy, z1 - dz);
                this.graphic.vertex(x1, y1, z1 - dz);

                this.graphic.triangleFan();
                this.graphic.vertex(x1, y1, z1);
                this.graphic.vertex(x1 - dx, y1, z1);
                this.graphic.vertex(x1 - dx, y1, z1 - dz);
                this.graphic.vertex(x1, y1, z1 - dz);
            }

            this.build = false;
        }
    }
}