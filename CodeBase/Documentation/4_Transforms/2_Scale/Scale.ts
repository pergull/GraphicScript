//
// Graphic.scale(x, y, z)
//
// Applies a scale to the display.
//

class Scale extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = this.makeGraphic();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Scale along the x-axis
        var x = Math.abs(Math.sin(Graphic.time()));
        Graphic.scale(x, 1, 1);

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