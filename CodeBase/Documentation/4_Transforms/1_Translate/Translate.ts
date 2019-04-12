//
// Graphic.translate(x, y, z)
//
// Applies a translation to the display.
//

class Translate extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = this.makeGraphic();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Translate along the x-axis
        var x = Math.sin(Graphic.time());
        Graphic.translate(x, 0, 0);

        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }

    // Make a graphic
    makeGraphic(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);

        return graphic;
    }
}