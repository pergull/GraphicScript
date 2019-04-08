//
// myGraphic.spheres()
//
// Starts sphere drawing at center defined with vertex() and size defined with radius().
//

class Spheres extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build spheres
        this.myGraphic.spheres();

        // Add sphere 1 to myGraphic with
        // center at vertex(0, 0, 0) and
        // default radius of 1
        this.myGraphic.color(1, 0, 0); // red
        this.myGraphic.vertex(0, 0, 0);

        // Add sphere 2 to myGraphic with
        // center at vertex(2, 2, 2) and
        // radius of 0.5
        this.myGraphic.color(0, 1, 0); // green
        this.myGraphic.radius(0.5);
        this.myGraphic.vertex(2, 2, 2);

        // Add sphere 3 using the current
        // radius of 0.5 and center at
        // vertex(4, 4, 4)
        this.myGraphic.color(0, 0, 1); // blue
        this.myGraphic.vertex(4, 4, 4);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
