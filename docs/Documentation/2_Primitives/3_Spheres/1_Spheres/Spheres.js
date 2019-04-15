//
// myGraphic.spheres()
//
// Starts sphere drawing at center defined with vertex() and size defined with radius().
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
var Spheres = /** @class */ (function (_super) {
    __extends(Spheres, _super);
    function Spheres() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build spheres
        _this.myGraphic.spheres();
        // Add sphere 1 to myGraphic with
        // center at vertex(0, 0, 0) and
        // default radius of 1
        _this.myGraphic.color(1, 0, 0); // red
        _this.myGraphic.vertex(0, 0, 0);
        // Add sphere 2 to myGraphic with
        // center at vertex(2, 2, 2) and
        // radius of 0.5
        _this.myGraphic.color(0, 1, 0); // green
        _this.myGraphic.radius(0.5);
        _this.myGraphic.vertex(2, 2, 2);
        // Add sphere 3 using the current
        // radius of 0.5 and center at
        // vertex(4, 4, 4)
        _this.myGraphic.color(0, 0, 1); // blue
        _this.myGraphic.vertex(4, 4, 4);
        return _this;
    }
    // GraphicScript display function
    Spheres.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return Spheres;
}(RunScript));
//# sourceMappingURL=Spheres.js.map