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
var HelloWorld = /** @class */ (function (_super) {
    __extends(HelloWorld, _super);
    function HelloWorld() {
        var _this = _super.call(this) || this;
        // Make world graphic object
        _this.myWorld = _this.makeWorld();
        return _this;
    }
    // GraphicScript display function
    HelloWorld.prototype.graphicDisplay = function () {
        // Rotate world 45 degrees/sec
        var degreesPerSec = 45;
        Graphic.rotate(Graphic.time() * degreesPerSec, 0, 0, 1);
        // Draw myWorld
        Graphic.draw(this.myWorld);
    };
    // Make world
    HelloWorld.prototype.makeWorld = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a sphere
        graphic.spheres();
        graphic.vertex(0, 0, 0);
        return graphic;
    };
    return HelloWorld;
}(RunScript));
//# sourceMappingURL=HelloWorld.js.map