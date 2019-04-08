class AnimatedFunction3D extends RunScript {

    // 3D Function
    f(x, y, time) {
        return Math.sin(x + y + time * 2 * Math.PI);
    }

    // x Range
    xMin = -3;
    xMax = 3;

    // y Range
    yMin = -3;
    yMax = 3;

    // z Range
    zMin = -10;
    zMax = 10;

    // Samples
    xSamples = 12;
    ySamples = 12;

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
    }

    // Clamp z to zMin and zMax
    clampZ(x, y, t) {
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
    }
}