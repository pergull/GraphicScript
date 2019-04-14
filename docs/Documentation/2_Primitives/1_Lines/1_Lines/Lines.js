//
// myGraphic.lines()
//
// Starts line drawing between vertices. If vertex 0, 1, 2 and  3 are defined, then lines will
// be drawn as:
//
//     1|     |3
//      |     |
//      |     |
//      |     |
//     0|     |2
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
var Lines = (function (_super) {
    __extends(Lines, _super);
    function Lines() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build lines
        _this.myGraphic.lines();
        // Add line 1 to myGraphic
        _this.myGraphic.color(1, 0, 0); // red
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(0, 1, 0);
        // Add line 2 to myGraphic
        _this.myGraphic.color(0, 1, 0); // green
        _this.myGraphic.vertex(1, 0, 0);
        _this.myGraphic.vertex(1, 1, 0);
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    Lines.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return Lines;
}(RunScript));
//# sourceMappingURL=Lines.js.map