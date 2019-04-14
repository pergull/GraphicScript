//
// Graphic.boundingBox(true|false)
//
// Toggles the display bounding box to be either visible or not  visible.
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
var BoundingBox = (function (_super) {
    __extends(BoundingBox, _super);
    function BoundingBox() {
        var _this = _super.call(this) || this;
        // Display the bounding box
        Graphic.boundingBox(true);
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        return _this;
    }
    // GraphicScript display function
    BoundingBox.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    BoundingBox.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Build a sphere
        graphic.spheres();
        graphic.vertex(0, 0, 0);
        return graphic;
    };
    return BoundingBox;
}(RunScript));
//# sourceMappingURL=BoundingBox.js.map