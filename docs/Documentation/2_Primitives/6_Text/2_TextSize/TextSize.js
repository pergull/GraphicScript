//
// myGraphic.textSize(size)
//
// Sets the text size.
//
// The default size is 1, which means that the text height will span 1 unit in the displayed coordinate system.
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
var TextSize = /** @class */ (function (_super) {
    __extends(TextSize, _super);
    function TextSize() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Add text with default size
        _this.myGraphic.text("1 unit");
        _this.myGraphic.vertex(0, 5, 2);
        // Add text with size 0.5
        _this.myGraphic.text("0.5 units");
        _this.myGraphic.textSize(0.5);
        _this.myGraphic.vertex(2, 0, 0);
        // Add text with size 2
        _this.myGraphic.text("2 units");
        _this.myGraphic.textSize(2);
        _this.myGraphic.vertex(-2, 10, 4);
        return _this;
    }
    // GraphicScript display function
    TextSize.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return TextSize;
}(RunScript));
//# sourceMappingURL=TextSize.js.map