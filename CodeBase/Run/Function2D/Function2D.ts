class Function2D extends RunScript {

    // Functions to plot
    f1(x) { return Math.sin(x) }
    f2(x) { return Math.cos(x * 2) }
    f3(x) { return Math.sin(x * (1 * x)) }

    // Range
    xMin = 0;
    xMax = 2 * Math.PI;

    // Samples
    xSamples = 300;

    // Colors
    color1 = [1, 1, 0];
    color2 = [0, 1, 1];
    color3 = [1, 0, 1];

    // Make plots
    plot1 = this.makePlot(this.f1, this.color1);
    plot2 = this.makePlot(this.f2, this.color2);
    plot3 = this.makePlot(this.f3, this.color3);

    // GraphicScript display function
    graphicDisplay() {
        // Draw plots
        Graphic.draw(this.plot1);
        Graphic.draw(this.plot2);
        Graphic.draw(this.plot3);
    }

    makePlot(f, color) {
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
    }
}