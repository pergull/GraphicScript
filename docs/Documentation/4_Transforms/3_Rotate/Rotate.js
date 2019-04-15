//
// Graphic.rotate(angle, x, y, z)
//
// Applies a rotation to the display.
//
// angle   = degrees to rotate
// x, y, z = vector to rotate about
//
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
var Rotate = /** @class */ (function (_super) {
    __extends(Rotate, _super);
    function Rotate() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        return _this;
    }
    // GraphicScript display function
    Rotate.prototype.graphicDisplay = function () {
        // Rotate about the x-axis at
        // 90 degrees per second
        var angle = 90 * Graphic.time();
        Graphic.rotate(angle, 1, 0, 0);
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    Rotate.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);
        return graphic;
    };
    return Rotate;
}(RunScript));
//# sourceMappingURL=Rotate.js.map