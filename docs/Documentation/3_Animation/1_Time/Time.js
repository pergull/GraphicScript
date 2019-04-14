//
// Graphic.time()
//
// Returns the elapsed display time in seconds. Used for controlling time based animation
// in the graphicDisplay() function.
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
var Time = (function (_super) {
    __extends(Time, _super);
    function Time() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    Time.prototype.graphicDisplay = function () {
        // Define control parameters to rotate at 90 degrees per
        // second about z-axis
        var degreesPerSec = 9;
        var axis = [0, 0, 1];
        // Use Graphic.time() and degreesPerSec to control the
        // speed of the rotation
        var angle = Graphic.time() * degreesPerSec;
        Graphic.rotate(angle, axis[0], axis[1], axis[2]);
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    Time.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);
        return graphic;
    };
    return Time;
}(RunScript));
//# sourceMappingURL=Time.js.map