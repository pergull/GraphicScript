//
// Graphic.pushTransform()
// Graphic.popTransform()
//
// Push & pop the current transform matrix
//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PushPop = (function (_super) {
    __extends(PushPop, _super);
    function PushPop() {
        var _this = _super.call(this) || this;
        // Make cylinder & cube
        _this.cylinder = _this.makeCylinder();
        _this.cube = _this.makeCube();
        return _this;
    }
    // GraphicScript display function
    PushPop.prototype.graphicDisplay = function () {
        // Use push and pop to apply
        // translation only to the cube.
        Graphic.pushTransform();
        var x = Math.sin(Graphic.time()) * 4;
        Graphic.translate(x, 0, 0);
        Graphic.draw(this.cube);
        Graphic.popTransform();
        // Draw cylinder with only rotation.
        // No translation is applied since
        // translation was within push & pop.
        Graphic.rotate(90 * Graphic.time(), 0, 0, 1);
        Graphic.draw(this.cylinder);
    };
    // Make a cylinder
    PushPop.prototype.makeCylinder = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a cylinder
        graphic.cylinders();
        graphic.radius(0.5);
        graphic.vertex(0, 0, 0);
        graphic.vertex(6, 0, 0);
        return graphic;
    };
    // Make a cube
    PushPop.prototype.makeCube = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);
        return graphic;
    };
    return PushPop;
}(RunScript));
//# sourceMappingURL=PushPop.js.map