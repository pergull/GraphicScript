//
// myGraphic.cylinders()
//
// Starts cylinder drawing between vertices.  Each cylinder has two vertices defining the start
// and end of the cylinder.
// 
// The cylinder radius at each end is defined with radius().
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
var Cylinders = /** @class */ (function (_super) {
    __extends(Cylinders, _super);
    function Cylinders() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build cylinders
        _this.myGraphic.cylinders();
        // Add cylinder 1 to myGraphic with
        // default radius of 1
        _this.myGraphic.color(1, 0, 0); // red
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(0, 5, 0);
        // Add cylinder 2 to myGraphic with
        // a radius of 0.5
        _this.myGraphic.color(0, 1, 0); // green
        _this.myGraphic.radius(0.5);
        _this.myGraphic.vertex(3, 0, 0);
        _this.myGraphic.vertex(3, 5, 0);
        // Add cylinder 3 to myGraphic with
        // a radius starting at 1.25 and
        // ending at 0.25
        _this.myGraphic.color(1, 0, 0); // red
        _this.myGraphic.radius(1.25);
        _this.myGraphic.vertex(6, 0, 0);
        _this.myGraphic.color(0, 1, 0); // green
        _this.myGraphic.radius(0.25);
        _this.myGraphic.vertex(6, 5, 0);
        return _this;
    }
    // GraphicScript display function
    Cylinders.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return Cylinders;
}(RunScript));
//# sourceMappingURL=Cylinders.js.map