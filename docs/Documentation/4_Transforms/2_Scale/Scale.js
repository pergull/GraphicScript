//
// Graphic.scale(x, y, z)
//
// Applies a scale to the display.
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
var Scale = /** @class */ (function (_super) {
    __extends(Scale, _super);
    function Scale() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        return _this;
    }
    // GraphicScript display function
    Scale.prototype.graphicDisplay = function () {
        // Scale along the x-axis
        var x = Math.abs(Math.sin(Graphic.time()));
        Graphic.scale(x, 1, 1);
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    Scale.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);
        return graphic;
    };
    return Scale;
}(RunScript));
//# sourceMappingURL=Scale.js.map