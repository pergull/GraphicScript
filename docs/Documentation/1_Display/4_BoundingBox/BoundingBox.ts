//
// Graphic.boundingBox(true|false)
//
// Toggles the display bounding box to be either visible or not  visible.
//

class BoundingBox extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();
        
        // Display the bounding box
        Graphic.boundingBox(true);

        // Make a graphic object
        this.myGraphic = this.makeGraphic();
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }

    // Make a graphic
    makeGraphic(): Graphic {
        // Make a new graphic
        var graphic = Graphic.make();

        // Build a sphere
        graphic.spheres();
        graphic.vertex(0, 0, 0);

        return graphic;
    }
}