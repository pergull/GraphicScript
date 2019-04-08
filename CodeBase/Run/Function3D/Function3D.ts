class Function3D extends RunScript {

    func(x, y) {
        return 1.0 - Math.cos(x * x + y * y) / (x * x + y * y);
    }

    // Range
    xMin = -3;
    xMax = 3;
    yMin = -3;
    yMax = 3;
    zMin = -3;
    zMax = 3;

    // Samples
    xSamples = 40;
    ySamples = 40;

    // Make plot
    myPlot = this.makePlot(this.func);

    // GraphicScript display function
    graphicDisplay() {
        // Draw myPlot
        Graphic.draw(this.myPlot);
    }

    // Define plot
    makePlot(f) {
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
    }

    // Clamp z to zMin and zMax
    clampZ(f, x, y) {
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
    }
}