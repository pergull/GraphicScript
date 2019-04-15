var Graphic = /** @class */ (function () {
    function Graphic() {
        this.gsGraphic = new GraphicScript.GsGraphic();
    }
    Graphic.make = function () {
        return new Graphic();
    };
    Graphic.draw = function (graphic) {
        graphic.gsGraphic.render();
    };
    Graphic.viewDirection = function (x, y, z) {
        gc.camera.setViewDirection(x, y, z);
        gc.hasViewDirection = true;
    };
    Graphic.viewUp = function (x, y, z) {
        gc.camera.setUpVector(x, y, z);
        gc.hasViewUp = true;
    };
    Graphic.translate = function (x, y, z) {
        gc.modelview.translate(x, y, z);
        gc.calcBoundBox = true;
    };
    Graphic.scale = function (x, y, z) {
        gc.modelview.scale(x, y, z);
        gc.calcBoundBox = true;
    };
    Graphic.rotate = function (angle, x, y, z) {
        gc.modelview.rotate(angle, x, y, z);
        gc.calcBoundBox = true;
    };
    Graphic.pushTransform = function () {
        gc.pushTransform();
        gc.calcBoundBox = true;
    };
    Graphic.popTransform = function () {
        gc.popTransform();
        gc.calcBoundBox = true;
    };
    Graphic.time = function () {
        return gc.currentTime;
    };
    Graphic.background = function (r, g, b) {
        gc.setBackground(r, g, b);
    };
    Graphic.boundingBox = function (enable) {
        gc.displayBoundingBox = enable;
    };
    Graphic.prototype.color = function (r, g, b) {
        this.gsGraphic.color(r, g, b, 1);
    };
    Graphic.prototype.vertex = function (x, y, z) {
        if (z !== undefined) {
            gc.dimensions = GraphicScript.Dimensions.Three;
            this.gsGraphic.vertex(x, y, z);
            gc.calcBoundBox = true;
        }
        else {
            this.gsGraphic.vertex(x, y, 0);
        }
    };
    Graphic.prototype.lines = function () {
        this.gsGraphic.lines();
    };
    Graphic.prototype.lineStrip = function () {
        this.gsGraphic.lineStrip();
    };
    Graphic.prototype.triangles = function () {
        this.gsGraphic.triangles();
    };
    Graphic.prototype.triangleStrip = function () {
        this.gsGraphic.triangleStrip();
    };
    Graphic.prototype.triangleFan = function () {
        this.gsGraphic.triangleFan();
    };
    Graphic.prototype.spheres = function () {
        this.gsGraphic.spheres();
    };
    Graphic.prototype.cuboids = function () {
        this.gsGraphic.cuboids();
    };
    Graphic.prototype.cylinders = function () {
        this.gsGraphic.cylinders();
    };
    Graphic.prototype.text = function (str) {
        this.gsGraphic.text(str.toString());
    };
    Graphic.prototype.textSize = function (size) {
        this.gsGraphic.textSize(size);
    };
    Graphic.prototype.radius = function (r) {
        this.gsGraphic.radius(r);
    };
    Graphic.prototype.clear = function () {
        this.gsGraphic.clear();
    };
    return Graphic;
}());
//# sourceMappingURL=Graphic.js.map