//
// myGraphic.lineStrip()
//
// Starts line strip drawing between vertices. If vertex 0, 1, 2 and3 are defined, then
// a line strip will be drawn as:
//       _____
//     1|     |2
//      |     |
//      |     |
//      |     |
//     0|     |3
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
var LineStrip = /** @class */ (function (_super) {
    __extends(LineStrip, _super);
    function LineStrip() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build a lineStrip
        _this.myGraphic.lineStrip();
        // Add line strip vertex data
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(0, 1, 0);
        _this.myGraphic.vertex(1, 1, 0);
        _this.myGraphic.vertex(1, 0, 0);
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    LineStrip.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return LineStrip;
}(RunScript));
//# sourceMappingURL=LineStrip.js.map