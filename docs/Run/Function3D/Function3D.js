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
var Function3D = /** @class */ (function (_super) {
    __extends(Function3D, _super);
    function Function3D() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Range
        _this.xMin = -3;
        _this.xMax = 3;
        _this.yMin = -3;
        _this.yMax = 3;
        _this.zMin = -3;
        _this.zMax = 3;
        // Samples
        _this.xSamples = 40;
        _this.ySamples = 40;
        // Make plot
        _this.myPlot = _this.makePlot(_this.func);
        return _this;
    }
    Function3D.prototype.func = function (x, y) {
        return 1.0 - Math.cos(x * x + y * y) / (x * x + y * y);
    };
    // GraphicScript display function
    Function3D.prototype.graphicDisplay = function () {
        // Draw myPlot
        Graphic.draw(this.myPlot);
    };
    // Define plot
    Function3D.prototype.makePlot = function (f) {
        // Make a new graphic
        var graphic = Graphic.make();
        // Calc sample increment
        var xInc = (this.xMax - this.xMin) / this.xSamples;
        var yInc = (this.yMax - this.yMin) / this.ySamples;
        //
        // Surface
        //
        //graphic.color(1, 1, 1);
        var x = this.xMin;
        for (i = 0; i < this.xSamples; i++) {
            // Add a triangleStrip to the current graphic
            graphic.triangleStrip();
            // Add vertex data to the current triangleStrip
            graphic.vertex(x, this.yMin, f(x, this.yMin));
            graphic.vertex(x + xInc, this.yMin, f(x + xInc, this.yMin));
            var y = this.yMin + yInc;
            for (j = 1; j <= this.ySamples; j++) {
                graphic.vertex(x, y, this.clampZ(f, x, y));
                graphic.vertex(x + xInc, y, this.clampZ(f, x + xInc, y));
                y += yInc;
            }
            x += xInc;
        }
        //
        // Mesh
        //
        graphic.color(0, 0, 0);
        var x = this.xMin;
        for (var i = 0; i <= this.xSamples; i++) {
            // Add a lineStrip to the current graphic
            graphic.lineStrip();
            // Add vertex data to the current lineStrip
            var y = this.yMin;
            for (var j = 0; j < this.ySamples + 1; j++) {
                graphic.vertex(x, y, this.clampZ(f, x, y));
                y += yInc;
            }
            x += xInc;
        }
        var y = this.yMin;
        for (var i = 0; i <= this.ySamples; i++) {
            // Add a lineStrip to the current graphic
            graphic.lineStrip();
            // Add vertex data to the current lineStrip
            var x = this.xMin;
            for (var j = 0; j < this.xSamples + 1; j++) {
                graphic.vertex(x, y, this.clampZ(f, x, y));
                x += xInc;
            }
            y += yInc;
        }
        return graphic;
    };
    // Clamp z to zMin and zMax
    Function3D.prototype.clampZ = function (f, x, y) {
        var zVal = f(x, y);
        if (zVal < this.zMin) {
            return this.zMin;
        }
        else if (zVal > this.zMax) {
            return this.zMax;
        }
        else {
            return zVal;
        }
    };
    return Function3D;
}(RunScript));
//# sourceMappingURL=Function3D.js.map