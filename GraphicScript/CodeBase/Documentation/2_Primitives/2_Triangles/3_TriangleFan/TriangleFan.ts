//
// myGraphic.triangleFan()
//
// Starts triangle fan drawing nbetween vertices. If vertex 0, 1, 2, 3 and 4 are defined, then
// a triangle fan will be drawn as:
//       _____
//     1|    /|2
//      |   / |
//      |  /  |
//      | /   |
//     0|/____|3
//       \    |
//        \   |
//         \  |
//          \ |
//           \|4
//

class TriangleFan extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build a triangle fan
        this.myGraphic.triangleFan();

        // Add triangle fan vertex data
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(0, 1, 0);
        this.myGraphic.vertex(0.5, 1, 0);
        this.myGraphic.vertex(0.5, 0, 0.3);
        this.myGraphic.vertex(0.5, -1, 0);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
