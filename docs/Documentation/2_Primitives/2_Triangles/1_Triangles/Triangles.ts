//
// myGraphic.triangles()
//
// Starts triangle drawing between vertices. If vertex 0, 1, 2, 3, 4 and 5 are defined, then
// triangles will be drawn as:
//       _____      _____
//     1|    /2   4|    /5
//      |   /      |   /
//      |  /       |  /
//      | /        | /
//     0|/        3|/
//

class Triangles extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build triangles
        this.myGraphic.triangles();

        // Add triangle 1 to myGraphic
        this.myGraphic.color(1, 0, 0); // red
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(0, 1, 0);
        this.myGraphic.vertex(0.5, 1, 0);

        // Add triangle 2 to myGraphic
        this.myGraphic.color(0, 1, 0); // green
        this.myGraphic.vertex(1, 0, 0);
        this.myGraphic.vertex(1, 1, 0);
        this.myGraphic.vertex(1.5, 1, 0);

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}