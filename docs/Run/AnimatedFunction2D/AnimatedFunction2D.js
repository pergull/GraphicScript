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
var AnimatedFunction2D = (function (_super) {
    __extends(AnimatedFunction2D, _super);
    function AnimatedFunction2D() {
        var _this = _super.call(this) || this;
        // Range
        _this.xMin = 0;
        _this.xMax = 2 * Math.PI;
        // Samples
        _this.xSamples = 300;
        // Make plot
        _this.myPlot = Graphic.make();
        return _this;
    }
    // 2D Function
    AnimatedFunction2D.prototype.f = function (x, time) {
        return Math.sin(x * (1 * x + time));
    };
    // GraphicScript display function
    AnimatedFunction2D.prototype.graphicDisplay = function () {
        // Build a new instance of the parametric surface
        // based on current display time
        this.makePlot(this.myPlot, Graphic.time());
        // Draw the current parametric surface
        Graphic.draw(this.myPlot);
    };
    AnimatedFunction2D.prototype.makePlot = function (graphic, t) {
        // Clear out last display data
        graphic.clear();
        // Yellow
        graphic.color(1, 1, 0);
        // Add a lineStrip
        graphic.lineStrip();
        // Add vertex data to the current lineStrip
        var x = this.xMin;
        var xInc = (this.xMax - this.xMin) / this.xSamples;
        for (var i = 0; i <= this.xSamples; i++) {
            graphic.vertex(x, this.f(x, t));
            x += xInc;
        }
    };
    return AnimatedFunction2D;
}(RunScript));
//# sourceMappingURL=AnimatedFunction2D.js.map