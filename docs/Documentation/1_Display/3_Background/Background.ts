//
// Graphic.background(r, g, b)
//
// Sets the background color.
//
// r = red
// g = green
// b = blue
//
// The values r, g and b range
// from 0 to 1.
//

class Background extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();
        
        // Set background to sky blue
        Graphic.background(0.53, 0.81, 0.98);

        // Make a graphic object
        this.myGraphic = this.makeGraphic();

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }


    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }

    // Make a graphic
    makeGraphic(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Build a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);

        return graphic;
    }
}