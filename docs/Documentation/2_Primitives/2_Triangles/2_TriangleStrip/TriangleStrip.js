//
// myGraphic.triangleStrip()
//
// Starts triangle strip drawing between vertices. If vertexv 0, 1, 2, 3, 4 and 5 are defined, then
// a triangle strip will be drawn as:
//       _____ _____
//     1|\    |3    |5
//      | \   | \   |
//      |  \  |  \  |
//      |   \ |   \ |
//     0|____\|2___\|4
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
var TriangleStrip = (function (_super) {
    __extends(TriangleStrip, _super);
    function TriangleStrip() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build a triangle strip
        _this.myGraphic.triangleStrip();
        // Add triangle strip vertex data
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(0, 1, 0);
        _this.myGraphic.vertex(0.5, 0, 0);
        _this.myGraphic.vertex(0.5, 1, 0.3);
        _this.myGraphic.vertex(1, 0, 0);
        _this.myGraphic.vertex(1, 1, 0);
        return _this;
    }
    // GraphicScript display function
    TriangleStrip.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return TriangleStrip;
}(RunScript));
//# sourceMappingURL=TriangleStrip.js.map