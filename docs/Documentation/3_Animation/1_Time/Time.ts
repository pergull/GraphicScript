//
// Graphic.time()
//
// Returns the elapsed display time in seconds. Used for controlling time based animation
// in the graphicDisplay() function.
//

class Time extends RunScript {

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
        // Define control parameters to rotate at 90 degrees per
        // second about z-axis
        var degreesPerSec = 9;
        var axis = [0, 0, 1];

        // Use Graphic.time() and degreesPerSec to control the
        // speed of the rotation
        var angle = Graphic.time() * degreesPerSec;
        Graphic.rotate(angle, axis[0], axis[1], axis[2]);

        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }

    // Make a graphic
    makeGraphic(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);

        return graphic;
    }
}