//
// myGraphic.triangleStrip()
//
// Starts triangle strip drawing between vertices. If vertexv 0, 1, 2, 3, 4 and 5 are defined, then
// a triangle strip will be drawn as:
//       _____ _____
//     1|\    |3    |5
//      | \   | \   |
//      |  \  |  \  |
//      |   \ |   \ |
//     0|____\|2___\|4
//

class TriangleStrip extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build a triangle strip
        this.myGraphic.triangleStrip();

        // Add triangle strip vertex data
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(0, 1, 0);
        this.myGraphic.vertex(0.5, 0, 0);
        this.myGraphic.vertex(0.5, 1, 0.3);
        this.myGraphic.vertex(1, 0, 0);
        this.myGraphic.vertex(1, 1, 0);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
