class HelloWorld extends RunScript {

    myWorld: Graphic

    constructor() {
        super();
        
        // Make world graphic object
        this.myWorld = this.makeWorld();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Rotate world 45 degrees/sec
        var degreesPerSec = 45;
        Graphic.rotate(Graphic.time() * degreesPerSec, 0, 0, 1);

        // Draw myWorld
        Graphic.draw(this.myWorld);
    }

    // Make world
    makeWorld() {
        // Make a new graphic
        var graphic = Graphic.make();

        // Add a sphere
        graphic.spheres();
        graphic.vertex(0, 0, 0);

        return graphic;
    }
}