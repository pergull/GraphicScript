var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GraphicScript;
(function (GraphicScript) {
    var GsGraphic = /** @class */ (function (_super) {
        __extends(GsGraphic, _super);
        function GsGraphic() {
            var _this = _super.call(this) || this;
            _this.curPrim = null;
            _this.clear();
            return _this;
        }
        GsGraphic.prototype.clear = function () {
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
        };
        GsGraphic.prototype.render = function () {
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
        };
        GsGraphic.prototype.vertex = function (x, y, z) {
            if (this.curPrim != null) {
                this.curPrim.vertex(x, y, z);
            }
        };
        GsGraphic.prototype.color = function (r, g, b, a) {
            this.currentColor.set(r, g, b, a);
            if (this.curPrim != null) {
                this.curPrim.color(r, g, b, a);
            }
        };
        GsGraphic.prototype.radius = function (r) {
            this.currentRadius = r;
            if (this.curPrim != null) {
                this.curPrim.radius(r);
            }
        };
        GsGraphic.prototype.textSize = function (size) {
            this.currentTextSize = size;
            if (this.curPrim != null) {
                this.curPrim.textSize(size);
            }
        };
        GsGraphic.prototype.lines = function () {
            var gsLines = new GraphicScript.GsLines();
            this.linesList.push(gsLines);
            this.curPrim = gsLines;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.lineStrip = function () {
            var gsLineStrip = new GraphicScript.GsLineStrip();
            this.lineStripList.push(gsLineStrip);
            this.curPrim = gsLineStrip;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.triangles = function () {
            var gsTriangles = new GraphicScript.GsTriangles();
            this.trianglesList.push(gsTriangles);
            this.curPrim = gsTriangles;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.triangleStrip = function () {
            var gsTriangleStrip = new GraphicScript.GsTriangleStrip();
            this.triangleStripList.push(gsTriangleStrip);
            this.curPrim = gsTriangleStrip;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.triangleFan = function () {
            var gsTriangleFan = new GraphicScript.GsTriangleFan();
            this.triangleFanList.push(gsTriangleFan);
            this.curPrim = gsTriangleFan;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.spheres = function () {
            var gsSpheres = new GraphicScript.GsSpheres();
            this.spheresList.push(gsSpheres);
            this.curPrim = gsSpheres;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.cylinders = function () {
            var gsCylinders = new GraphicScript.GsCylinders();
            this.cylindersList.push(gsCylinders);
            this.curPrim = gsCylinders;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.cuboids = function () {
            var gsCuboids = new GraphicScript.GsCuboids();
            this.cuboidsList.push(gsCuboids);
            this.curPrim = gsCuboids;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        GsGraphic.prototype.text = function (str) {
            var gsText = new GraphicScript.GsText(str);
            this.textList.push(gsText);
            this.curPrim = gsText;
            this.color(this.currentColor.r, this.currentColor.g, this.currentColor.b, this.currentColor.a);
        };
        return GsGraphic;
    }(GraphicScript.GsVertex));
    GraphicScript.GsGraphic = GsGraphic;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsGraphic.js.map