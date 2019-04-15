//
// Graphic.viewDirection(x, y, z)
// Graphic.viewUp(x, y, z)
//
// Sets up view orientation.
//
// viewDirection(x, y, z) sets the view direction vector.
//
// viewUp(x, y, z) sets the view up vector.
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
var ViewOrientation = /** @class */ (function (_super) {
    __extends(ViewOrientation, _super);
    function ViewOrientation() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        // Don't display the bounding box
        Graphic.boundingBox(false);
        // Set up view orientation
        //
        // View along -Z axis
        Graphic.viewDirection(0, 0, -1);
        // Y axis points up
        Graphic.viewUp(0, 1, 0);
        return _this;
    }
    // GraphicScript display function
    ViewOrientation.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    ViewOrientation.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Create a sphere at the origin  
        graphic.spheres();
        graphic.vertex(0, 0, 0);
        // Create coordinate system to
        // understand view orientation
        var axisLength = 3;
        // X axis
        graphic.text("X");
        graphic.color(1, 0, 0);
        graphic.vertex(axisLength, 0, 0);
        graphic.lines();
        graphic.vertex(0, 0, 0);
        graphic.vertex(axisLength, 0, 0);
        // Y axis
        graphic.text("Y");
        graphic.color(0, 1, 0);
        graphic.vertex(0, axisLength, 0);
        graphic.lines();
        graphic.vertex(0, 0, 0);
        graphic.vertex(0, axisLength, 0);
        // Z axis
        graphic.text("Z");
        graphic.color(0, 0, 1);
        graphic.vertex(0, 0, axisLength);
        graphic.lines();
        graphic.vertex(0, 0, 0);
        graphic.vertex(0, 0, axisLength);
        return graphic;
    };
    return ViewOrientation;
}(RunScript));
//# sourceMappingURL=ViewOrientation.js.map