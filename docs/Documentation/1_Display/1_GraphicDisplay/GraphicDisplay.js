//
// graphicDisplay()
//
// The function responsible for drawing the defined graphics. 
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
var GraphicDisplay = /** @class */ (function (_super) {
    __extends(GraphicDisplay, _super);
    function GraphicDisplay() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    GraphicDisplay.prototype.graphicDisplay = function () {
        // Don't display the bounding box
        Graphic.boundingBox(false);
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    GraphicDisplay.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Build a triangle fan
        graphic.triangleFan();
        // Add a square to graphic
        graphic.vertex(-1, -1, 0);
        graphic.vertex(-1, 1, 0);
        graphic.vertex(1, 1, 0);
        graphic.vertex(1, -1, 0);
        return graphic;
    };
    return GraphicDisplay;
}(RunScript));
//# sourceMappingURL=GraphicDisplay.js.map