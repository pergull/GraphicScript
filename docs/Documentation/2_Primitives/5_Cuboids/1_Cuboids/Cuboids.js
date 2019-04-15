//
// myGraphic.cuboids()
//
// Starts cuboid drawing between vertices.  Each cuboid has  two vertices where the first
// vertex defines the cuboid's minimum constraint and the second vertex defines the
// cuboid's maximum constraint.
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
var Cuboids = /** @class */ (function (_super) {
    __extends(Cuboids, _super);
    function Cuboids() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = Graphic.make();
        // Build cuboids
        _this.myGraphic.cuboids();
        // Add cuboid 1
        _this.myGraphic.color(1, 0, 0); // red
        _this.myGraphic.vertex(0, 0, 0);
        _this.myGraphic.vertex(1, 1, 1);
        // Add cuboid 2
        _this.myGraphic.color(0, 1, 0); // green
        _this.myGraphic.vertex(2, 0, 0);
        _this.myGraphic.vertex(3.5, 2, 1.2);
        // Add cuboid 3
        _this.myGraphic.color(0, 0, 1); // blue
        _this.myGraphic.vertex(5, 0, 0);
        _this.myGraphic.vertex(6, 3, 3);
        return _this;
    }
    // GraphicScript display function
    Cuboids.prototype.graphicDisplay = function () {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    return Cuboids;
}(RunScript));
//# sourceMappingURL=Cuboids.js.map