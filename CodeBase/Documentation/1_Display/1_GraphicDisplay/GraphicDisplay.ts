//
// graphicDisplay()
//
// The function responsible for drawing the defined graphics. 
//

class GraphicDisplay extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = this.makeGraphic();

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Don't display the bounding box
        Graphic.boundingBox(false);

        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }

    // Make a graphic
    makeGraphic(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Build a triangle fan
        graphic.triangleFan();

        // Add a square to graphic
        graphic.vertex(-1, -1, 0);
        graphic.vertex(-1, 1, 0);
        graphic.vertex(1, 1, 0);
        graphic.vertex(1, -1, 0);

        return graphic;
    }
}