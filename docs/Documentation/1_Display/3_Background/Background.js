//
// Graphic.background(r, g, b)
//
// Sets the background color.
//
// r = red
// g = green
// b = blue
//
// The values r, g and b range
// from 0 to 1.
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
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super.call(this) || this;
        // Set background to sky blue
        Graphic.background(0.53, 0.81, 0.98);
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    Background.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    Background.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Build a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);
        return graphic;
    };
    return Background;
}(RunScript));
//# sourceMappingURL=Background.js.map