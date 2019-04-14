//
// myGraphic.cylinders()
//
// Starts cylinder drawing between vertices.  Each cylinder has two vertices defining the start
// and end of the cylinder.
// 
// The cylinder radius at each end is defined with radius().
//

class Cylinders extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Build cylinders
        this.myGraphic.cylinders();

        // Add cylinder 1 to myGraphic with
        // default radius of 1
        this.myGraphic.color(1, 0, 0); // red
        this.myGraphic.vertex(0, 0, 0);
        this.myGraphic.vertex(0, 5, 0);

        // Add cylinder 2 to myGraphic with
        // a radius of 0.5
        this.myGraphic.color(0, 1, 0); // green
        this.myGraphic.radius(0.5);
        this.myGraphic.vertex(3, 0, 0);
        this.myGraphic.vertex(3, 5, 0);

        // Add cylinder 3 to myGraphic with
        // a radius starting at 1.25 and
        // ending at 0.25
        this.myGraphic.color(1, 0, 0);  // red
        this.myGraphic.radius(1.25);
        this.myGraphic.vertex(6, 0, 0);
        this.myGraphic.color(0, 1, 0);  // green
        this.myGraphic.radius(0.25);
        this.myGraphic.vertex(6, 5, 0);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
