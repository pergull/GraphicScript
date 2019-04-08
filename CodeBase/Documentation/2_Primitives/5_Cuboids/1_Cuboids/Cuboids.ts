//
// myGraphic.cuboids()
//
// Starts cuboid drawing between vertices.  Each cuboid has  two vertices where the first
// vertex defines the cuboid's minimum constraint and the second vertex defines the
// cuboid's maximum constraint.
//

class Cuboids extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build cuboids
        this.myGraphic.cuboids();

        // Add cuboid 1
        this.myGraphic.color(1, 0, 0); // red
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(1, 1, 1);

        // Add cuboid 2
        this.myGraphic.color(0, 1, 0); // green
        this.myGraphic.vertex(2, 0, 0);
        this.myGraphic.vertex(3.5, 2, 1.2);

        // Add cuboid 3
        this.myGraphic.color(0, 0, 1); // blue
        this.myGraphic.vertex(5, 0, 0);
        this.myGraphic.vertex(6, 3, 3);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
