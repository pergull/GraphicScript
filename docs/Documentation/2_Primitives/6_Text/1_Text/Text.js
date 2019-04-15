//
// myGraphic.text(string)
//
// Starts text drawing with argument string at vertices that follow.
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
var TextDemo = /** @class */ (function (_super) {
    __extends(TextDemo, _super);
    function TextDemo() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build text string "Hello World"
        _this.myGraphic.text("Hello World");
        // Add current text at vertex
        _this.myGraphic.vertex(0, 0);
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    TextDemo.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return TextDemo;
}(RunScript));
//# sourceMappingURL=Text.js.map