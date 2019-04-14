//
// Graphic.viewDirection(x, y, z)
// Graphic.viewUp(x, y, z)
//
// Sets up view orientation.
//
// viewDirection(x, y, z) sets the view direction vector.
//
// viewUp(x, y, z) sets the view up vector.
//

class ViewOrientation extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();
        
        // Make a graphic object
        this.myGraphic = this.makeGraphic();

        // Don't display the bounding box
        Graphic.boundingBox(false);

        // Set up view orientation
        //
        // View along -Z axis
        Graphic.viewDirection(0, 0, -1);
        // Y axis points up
        Graphic.viewUp(0, 1, 0);
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

        // Create a sphere at the origin  
        graphic.spheres();
        graphic.vertex(0, 0, 0);

        // Create coordinate system to
        // understand view orientation
        var axisLength = 3;
        // X axis
        graphic.text("X");
        graphic.color(1, 0, 0);
        graphic.vertex(axisLength, 0, 0);
        graphic.lines();
        graphic.vertex(0, 0, 0);
        graphic.vertex(axisLength, 0, 0);
        // Y axis
        graphic.text("Y");
        graphic.color(0, 1, 0);
        graphic.vertex(0, axisLength, 0);
        graphic.lines();
        graphic.vertex(0, 0, 0);
        graphic.vertex(0, axisLength, 0);
        // Z axis
        graphic.text("Z");
        graphic.color(0, 0, 1);
        graphic.vertex(0, 0, axisLength);
        graphic.lines();
        graphic.vertex(0, 0, 0);
        graphic.vertex(0, 0, axisLength);

        return graphic;
    }
}