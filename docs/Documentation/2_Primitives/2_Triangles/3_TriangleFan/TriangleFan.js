//
// myGraphic.triangleFan()
//
// Starts triangle fan drawing nbetween vertices. If vertex 0, 1, 2, 3 and 4 are defined, then
// a triangle fan will be drawn as:
//       _____
//     1|    /|2
//      |   / |
//      |  /  |
//      | /   |
//     0|/____|3
//       \    |
//        \   |
//         \  |
//          \ |
//           \|4
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
var TriangleFan = /** @class */ (function (_super) {
    __extends(TriangleFan, _super);
    function TriangleFan() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build a triangle fan
        _this.myGraphic.triangleFan();
        // Add triangle fan vertex data
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(0, 1, 0);
        _this.myGraphic.vertex(0.5, 1, 0);
        _this.myGraphic.vertex(0.5, 0, 0.3);
        _this.myGraphic.vertex(0.5, -1, 0);
        return _this;
    }
    // GraphicScript display function
    TriangleFan.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return TriangleFan;
}(RunScript));
//# sourceMappingURL=TriangleFan.js.map