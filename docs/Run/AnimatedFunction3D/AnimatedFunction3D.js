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
var AnimatedFunction3D = /** @class */ (function (_super) {
    __extends(AnimatedFunction3D, _super);
    function AnimatedFunction3D() {
        var _this = _super.call(this) || this;
        // x Range
        _this.xMin = -3;
        _this.xMax = 3;
        // y Range
        _this.yMin = -3;
        _this.yMax = 3;
        // z Range
        _this.zMin = -10;
        _this.zMax = 10;
        // Samples
        _this.xSamples = 12;
        _this.ySamples = 12;
        // Make plot
        _this.myPlot = Graphic.make();
        return _this;
    }
    // 3D Function
    AnimatedFunction3D.prototype.f = function (x, y, time) {
        return Math.sin(x + y + time * 2 * Math.PI);
    };
    // GraphicScript display function
    AnimatedFunction3D.prototype.graphicDisplay = function () {
        // Build a new instance of the parametric surface
        // based on current display time
        this.makePlot(this.myPlot, Graphic.time());
        // Draw the current parametric surface
        Graphic.draw(this.myPlot);
    };
    AnimatedFunction3D.prototype.makePlot = function (graphic, t) {
        // Clear out last display data
        graphic.clear();
        // Calc sample increment
        var xInc = (this.xMax - this.xMin) / this.xSamples;
        var yInc = (this.yMax - this.yMin) / this.ySamples;
        //
        // Surface
        //
        graphic.color(1, 1, 1);
        var x = this.xMin;
        for (var i = 0; i < this.xSamples; i++) {
            // Add a triangleStrip
            graphic.triangleStrip();
            // Add vertex data to current triangleStrip
            graphic.vertex(x, this.yMin, this.clampZ(x, this.yMin, t));
            graphic.vertex(x + xInc, this.yMin, this.clampZ(x + xInc, this.yMin, t));
            var y = this.yMin + yInc;
            for (var j = 1; j <= this.ySamples; j++) {
                graphic.vertex(x, y, this.clampZ(x, y, t));
                graphic.vertex(x + xInc, y, this.clampZ(x + xInc, y, t));
                y += yInc;
            }
            x += xInc;
        }
        //
        // Mesh
        //
        graphic.color(0, 0, 0);
        // line strips along y
        var x = this.xMin;
        for (var i = 0; i <= this.xSamples; i++) {
            // Add a lineStrip
            graphic.lineStrip();
            // Add vertex data to current lineStrip
            y = this.yMin;
            for (j = 0; j < this.ySamples + 1; j++) {
                graphic.vertex(x, y, this.clampZ(x, y, t));
                y += yInc;
            }
            x += xInc;
        }
        // line strips along x
        var y = this.yMin;
        for (var i = 0; i <= this.ySamples; i++) {
            // Add a lineStrip
            graphic.lineStrip();
            // Add vertex data to current lineStrip
            x = this.xMin;
            for (j = 0; j < this.xSamples + 1; j++) {
                graphic.vertex(x, y, this.clampZ(x, y, t));
                x += xInc;
            }
            y += yInc;
        }
    };
    // Clamp z to zMin and zMax
    AnimatedFunction3D.prototype.clampZ = function (x, y, t) {
        var zVal = this.f(x, y, t);
        // chop off anything less than zMin or greater than zMax
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
    return AnimatedFunction3D;
}(RunScript));
//# sourceMappingURL=AnimatedFunction3D.js.map