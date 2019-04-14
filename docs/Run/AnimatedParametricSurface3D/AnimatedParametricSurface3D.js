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
var AnimatedParametricSurface3D = (function (_super) {
    __extends(AnimatedParametricSurface3D, _super);
    function AnimatedParametricSurface3D() {
        var _this = _super.call(this) || this;
        // u Range
        _this.uMin = 0;
        _this.uMax = 2 * Math.PI;
        // v Range
        _this.vMin = -Math.PI;
        _this.vMax = 0;
        // Samples
        _this.uSamples = 20;
        _this.vSamples = 20;
        // Make plot
        _this.myPlot = Graphic.make();
        return _this;
    }
    // Parametric Surface
    AnimatedParametricSurface3D.prototype.fx = function (u, v, time) { return Math.cos(u); };
    AnimatedParametricSurface3D.prototype.fy = function (u, v, time) { return Math.sin(u) + Math.cos(time) * Math.cos(v); };
    AnimatedParametricSurface3D.prototype.fz = function (u, v, time) { return Math.sin(v); };
    // GraphicScript display function
    AnimatedParametricSurface3D.prototype.graphicDisplay = function () {
        // Build a new instance of the parametric surface
        // based on current display time
        this.makePlot(this.myPlot, Graphic.time());
        // Draw the current parametric surface
        Graphic.draw(this.myPlot);
    };
    AnimatedParametricSurface3D.prototype.makePlot = function (graphic, t) {
        // Clear out last display data
        graphic.clear();
        // Calc sample increment
        var uInc = (this.uMax - this.uMin) / this.uSamples;
        var vInc = (this.vMax - this.vMin) / this.vSamples;
        //
        // Surface
        //
        var u0 = this.uMin;
        var u1 = this.uMin + uInc;
        for (var i = 0; i < this.uSamples; i++) {
            // Add a triangleStrip
            graphic.triangleStrip();
            // Add vertex data to current triangleStrip
            var v0 = this.vMin;
            var v1 = this.vMin;
            for (var j = 0; j <= this.vSamples; j++) {
                graphic.vertex(this.fx(u0, v0, t), this.fy(u0, v0, t), this.fz(u0, v0, t));
                graphic.vertex(this.fx(u1, v0, t), this.fy(u1, v0, t), this.fz(u1, v0, t));
                v0 += vInc;
                v1 += vInc;
            }
            u0 += uInc;
            u1 += uInc;
        }
        //
        // Mesh
        //
        // lines along v
        var u = this.uMin;
        for (var i = 0; i < this.uSamples; i++) {
            // Add a lineStrip
            graphic.lineStrip();
            // Add vertex data to current lineStrip
            var v = this.vMin;
            for (var j = 0; j <= this.vSamples; j++) {
                graphic.vertex(this.fx(u, v, t), this.fy(u, v, t), this.fz(u, v, t));
                v += vInc;
            }
            u += uInc;
        }
        // lines along u
        var v = this.vMin;
        for (var i = 0; i < this.vSamples; i++) {
            // Add a lineStrip
            graphic.lineStrip();
            // Add vertex data to current lineStrip
            var u = this.uMin;
            for (var j = 0; j <= this.uSamples; j++) {
                graphic.vertex(this.fx(u, v, t), this.fy(u, v, t), this.fz(u, v, t));
                u += uInc;
            }
            v += vInc;
        }
    };
    return AnimatedParametricSurface3D;
}(RunScript));
//# sourceMappingURL=AnimatedParametricSurface3D.js.map