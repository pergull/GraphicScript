class AnimatedParametricSurface3D extends RunScript {

    // Parametric Surface
    fx(u, v, time) { return Math.cos(u); }
    fy(u, v, time) { return Math.sin(u) + Math.cos(time) * Math.cos(v); }
    fz(u, v, time) { return Math.sin(v); }

    // u Range
    uMin = 0;
    uMax = 2 * Math.PI;

    // v Range
    vMin = -Math.PI;
    vMax = 0;

    // Samples
    uSamples = 20;
    vSamples = 20;

    // the graphic plot
    myPlot: Graphic;

    constructor() {
        super();
        
        // Make plot
        this.myPlot = Graphic.make();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Build a new instance of the parametric surface
        // based on current display time
        this.makePlot(this.myPlot, Graphic.time());

        // Draw the current parametric surface
        Graphic.draw(this.myPlot);
    }

    makePlot(graphic: Graphic, t) {
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
    }
}
