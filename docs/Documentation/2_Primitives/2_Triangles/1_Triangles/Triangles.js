//
// myGraphic.triangles()
//
// Starts triangle drawing between vertices. If vertex 0, 1, 2, 3, 4 and 5 are defined, then
// triangles will be drawn as:
//       _____      _____
//     1|    /2   4|    /5
//      |   /      |   /
//      |  /       |  /
//      | /        | /
//     0|/        3|/
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
var Triangles = (function (_super) {
    __extends(Triangles, _super);
    function Triangles() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build triangles
        _this.myGraphic.triangles();
        // Add triangle 1 to myGraphic
        _this.myGraphic.color(1, 0, 0); // red
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(0, 1, 0);
        _this.myGraphic.vertex(0.5, 1, 0);
        // Add triangle 2 to myGraphic
        _this.myGraphic.color(0, 1, 0); // green
        _this.myGraphic.vertex(1, 0, 0);
        _this.myGraphic.vertex(1, 1, 0);
        _this.myGraphic.vertex(1.5, 1, 0);
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    Triangles.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return Triangles;
}(RunScript));
//# sourceMappingURL=Triangles.js.map