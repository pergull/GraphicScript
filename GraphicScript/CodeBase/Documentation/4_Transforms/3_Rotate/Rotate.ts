//
// Graphic.rotate(angle, x, y, z)
//
// Applies a rotation to the display.
//
// angle   = degrees to rotate
// x, y, z = vector to rotate about
//

class Rotate extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = this.makeGraphic();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Rotate about the x-axis at
        // 90 degrees per second
        var angle = 90 * Graphic.time();
        Graphic.rotate(angle, 1, 0, 0);

        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }

    // Make a graphic
    makeGraphic() {
        // Make a new graphic
        var graphic = Graphic.make();

        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);

        return graphic;
    }
}