//
// Graphic.pushTransform()
// Graphic.popTransform()
//
// Push & pop the current transform matrix
//

class PushPop extends RunScript {

    cylinder: Graphic;
    cube: Graphic;

    constructor() {
        super();

        // Make cylinder & cube
        this.cylinder = this.makeCylinder();
        this.cube = this.makeCube();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Use push and pop to apply
        // translation only to the cube.
        Graphic.pushTransform();
        var x = Math.sin(Graphic.time()) * 4;
        Graphic.translate(x, 0, 0);
        Graphic.draw(this.cube);
        Graphic.popTransform();

        // Draw cylinder with only rotation.
        // No translation is applied since
        // translation was within push & pop.
        Graphic.rotate(90 * Graphic.time(), 0, 0, 1);
        Graphic.draw(this.cylinder);
    }

    // Make a cylinder
    makeCylinder(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Add a cylinder
        graphic.cylinders();
        graphic.radius(0.5);
        graphic.vertex(0, 0, 0);
        graphic.vertex(6, 0, 0);

        return graphic;
    }

    // Make a cube
    makeCube(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);

        return graphic;
    }
}