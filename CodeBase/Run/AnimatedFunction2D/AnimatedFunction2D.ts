class AnimatedFunction2D extends RunScript {

    // 2D Function
    f(x, time) {
        return Math.sin(x * (1 * x + time));
    }

    // Range
    xMin = 0;
    xMax = 2 * Math.PI;

    // Samples
    xSamples = 300;

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
    }
}