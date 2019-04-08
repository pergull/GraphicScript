class ParametricButterflyPlot2D extends RunScript {

    // fy(t) - function controlling x
    fx(t) {
        var e = Math.exp(1);

        return Math.sin(t) * (Math.pow(e, Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12.), 5));
    }

    // fy(t) - function controlling y
    fy(t) {
        var e = Math.exp(1);

        return Math.cos(t) * (Math.pow(e, Math.cos(t)) - 2 * Math.cos(4 * t) - Math.pow(Math.sin(t / 12.), 5));
    }

    // Range
    tMin = 0;
    tMax = 20 * Math.PI;

    // Samples
    tSamples = 2000;

    // Make plot
    myPlot = this.makePlot();

    // GraphicScript display function
    graphicDisplay() {
        // Draw plot
        Graphic.draw(this.myPlot);
    }

    // Define plot graphics data
    makePlot() {
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
    }
}