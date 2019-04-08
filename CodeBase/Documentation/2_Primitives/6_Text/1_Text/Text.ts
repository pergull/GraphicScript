//
// myGraphic.text(string)
//
// Starts text drawing with argument string at vertices that follow.
//

class TextDemo extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build text string "Hello World"
        this.myGraphic.text("Hello World");

        // Add current text at vertex
        this.myGraphic.vertex(0, 0);

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
