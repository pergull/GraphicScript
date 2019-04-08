module GraphicScript {

    export class GsGraphic extends GsVertex {

        curPrim: GsVertex;

        linesList: GsLines[];
        lineStripList: GsLineStrip[];
        trianglesList: GsTriangles[];
        triangleStripList: GsTriangleStrip[];
        triangleFanList: GsTriangleFan[];
        spheresList: GsSpheres[];
        cylindersList: GsCylinders[];
        cuboidsList: GsCuboids[];
        textList: GsText[];

        constructor() {
            super();
            this.curPrim = null;
            this.clear();
        }

        clear() {
            this.linesList = [];
            this.lineStripList = [];
            this.trianglesList = [];
            this.triangleStripList = [];
            this.triangleFanList = [];
            this.spheresList = [];
            this.cylindersList = [];
            this.cuboidsList = [];
            this.textList = [];

            this.setDefaultValues();
        }
    
        render() {
            gc.updateMatrix();

            for (var i = 0; i < this.linesList.length; i++) {
                this.linesList[i].render();
            }

            for (var i = 0; i < this.lineStripList.length; i++) {
                this.lineStripList[i].render();
            }

            for (var i = 0; i < this.trianglesList.length; i++) {
                this.trianglesList[i].render();
            }

            for (var i = 0; i < this.triangleStripList.length; i++) {
                this.triangleStripList[i].render();
            }

            for (var i = 0; i < this.triangleFanList.length; i++) {
                this.triangleFanList[i].render();
            }

            for (var i = 0; i < this.spheresList.length; i++) {
                this.spheresList[i].render();
            }

            for (var i = 0; i < this.cylindersList.length; i++) {
                this.cylindersList[i].render();
            }

            for (var i = 0; i < this.cuboidsList.length; i++) {
                this.cuboidsList[i].render();
            }

            for (var i = 0; i < this.textList.length; i++) {
                this.textList[i].render();
            }
        }

        vertex(x: number, y: number, z: number) {
            if (this.curPrim != null) {
                this.curPrim.vertex(x, y, z);
            }
        }

        color(r: number, g: number, b: number, a: number) {
            this.currentColor.set(r, g, b, a);

            if (this.curPrim != null) {
                this.curPrim.color(r, g, b, a);
            }
        }

        radius(r: number) {
            this.currentRadius = r;

            if (this.curPrim != null) {
                this.curPrim.radius(r);
            }
        }

        textSize(size: number) {
            this.currentTextSize = size;

            if (this.curPrim != null) {
                this.curPrim.textSize(size);
            }
        }

        lines() {
            var gsLines = new GsLines();
            this.linesList.push(gsLines);
            this.curPrim = gsLines;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        lineStrip() {
            var gsLineStrip = new GsLineStrip();
            this.lineStripList.push(gsLineStrip);
            this.curPrim = gsLineStrip;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        triangles() {
            var gsTriangles = new GsTriangles();
            this.trianglesList.push(gsTriangles);
            this.curPrim = gsTriangles;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        triangleStrip() {
            var gsTriangleStrip = new GsTriangleStrip();
            this.triangleStripList.push(gsTriangleStrip);
            this.curPrim = gsTriangleStrip;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        triangleFan() {
            var gsTriangleFan = new GsTriangleFan();
            this.triangleFanList.push(gsTriangleFan);
            this.curPrim = gsTriangleFan;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        spheres() {
            var gsSpheres = new GsSpheres();
            this.spheresList.push(gsSpheres);
            this.curPrim = gsSpheres;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        cylinders() {
            var gsCylinders = new GsCylinders();
            this.cylindersList.push(gsCylinders);
            this.curPrim = gsCylinders;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        cuboids() {
            var gsCuboids = new GsCuboids();
            this.cuboidsList.push(gsCuboids);
            this.curPrim = gsCuboids;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }

        text(str: string) {
            var gsText = new GsText(str);
            this.textList.push(gsText);
            this.curPrim = gsText;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        }
    }
}