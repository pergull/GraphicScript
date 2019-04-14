//
// myGraphic.lines()
//
// Starts line drawing between vertices. If vertex 0, 1, 2 and  3 are defined, then lines will
// be drawn as:
//
//     1|     |3
//      |     |
//      |     |
//      |     |
//     0|     |2
//

class Lines extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build lines
        this.myGraphic.lines();

        // Add line 1 to myGraphic
        this.myGraphic.color(1, 0, 0); // red
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(0, 1, 0);

        // Add line 2 to myGraphic
        this.myGraphic.color(0, 1, 0); // green
        this.myGraphic.vertex(1, 0, 0);
        this.myGraphic.vertex(1, 1, 0);

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}