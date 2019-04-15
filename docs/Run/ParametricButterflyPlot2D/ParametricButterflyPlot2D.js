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
var ParametricButterflyPlot2D = /** @class */ (function (_super) {
    __extends(ParametricButterflyPlot2D, _super);
    function ParametricButterflyPlot2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Range
        _this.tMin = 0;
        _this.tMax = 20 * Math.PI;
        // Samples
        _this.tSamples = 2000;
        // Make plot
        _this.myPlot = _this.makePlot();
        return _this;
    }
    // fy(t) - function controlling x
    ParametricButterflyPlot2D.prototype.fx = function (t) {
        var e = Math.exp(1);
        return Math.sin(t) * (Math.pow(e, Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12.), 5));
    };
    // fy(t) - function controlling y
    ParametricButterflyPlot2D.prototype.fy = function (t) {
        var e = Math.exp(1);
        return Math.cos(t) * (Math.pow(e, Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12.), 5));
    };
    // GraphicScript display function
    ParametricButterflyPlot2D.prototype.graphicDisplay = function () {
        // Draw plot
        Graphic.draw(this.myPlot);
    };
    // Define plot graphics data
    ParametricButterflyPlot2D.prototype.makePlot = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        graphic.color(1, 1, 0);
        // Add a lineStrip to represent the plot
        graphic.lineStrip();
        // Add vertex data to the current lineStrip
        var t = this.tMin;
        var tInc = (this.tMax - this.tMin) / this.tSamples;
        for (var i = 0; i <= this.tSamples; i++) {
            graphic.vertex(this.fx(t), this.fy(t));
            t += tInc;
        }
        return graphic;
    };
    return ParametricButterflyPlot2D;
}(RunScript));
//# sourceMappingURL=ParametricButterflyPlot2D.js.map