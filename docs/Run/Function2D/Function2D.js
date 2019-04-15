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
var Function2D = /** @class */ (function (_super) {
    __extends(Function2D, _super);
    function Function2D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Range
        _this.xMin = 0;
        _this.xMax = 2 * Math.PI;
        // Samples
        _this.xSamples = 300;
        // Colors
        _this.color1 = [1, 1, 0];
        _this.color2 = [0, 1, 1];
        _this.color3 = [1, 0, 1];
        // Make plots
        _this.plot1 = _this.makePlot(_this.f1, _this.color1);
        _this.plot2 = _this.makePlot(_this.f2, _this.color2);
        _this.plot3 = _this.makePlot(_this.f3, _this.color3);
        return _this;
    }
    // Functions to plot
    Function2D.prototype.f1 = function (x) { return Math.sin(x); };
    Function2D.prototype.f2 = function (x) { return Math.cos(x * 2); };
    Function2D.prototype.f3 = function (x) { return Math.sin(x * (1 * x)); };
    // GraphicScript display function
    Function2D.prototype.graphicDisplay = function () {
        // Draw plots
        Graphic.draw(this.plot1);
        Graphic.draw(this.plot2);
        Graphic.draw(this.plot3);
    };
    Function2D.prototype.makePlot = function (f, color) {
        // Make a new graphic
        var graphic = Graphic.make();
        // Plot color
        graphic.color(color[0], color[1], color[2]);
        // Add a lineStrip to represent the plot
        graphic.lineStrip();
        // Add vertex data to the current lineStrip
        var x = this.xMin;
        var xInc = (this.xMax - this.xMin) / this.xSamples;
        for (var i = 0; i <= this.xSamples; i++) {
            graphic.vertex(x, f(x));
            x += xInc;
        }
        return graphic;
    };
    return Function2D;
}(RunScript));
//# sourceMappingURL=Function2D.js.map