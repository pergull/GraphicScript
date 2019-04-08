//
// myGraphic.lineStrip()
//
// Starts line strip drawing between vertices. If vertex 0, 1, 2 and3 are defined, then
// a line strip will be drawn as:
//       _____
//     1|     |2
//      |     |
//      |     |
//      |     |
//     0|     |3
//

class LineStrip extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();
        
        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build a lineStrip
        this.myGraphic.lineStrip();

        // Add line strip vertex data
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(0, 1, 0);
        this.myGraphic.vertex(1, 1, 0);
        this.myGraphic.vertex(1, 0, 0);

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
