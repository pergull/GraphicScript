//
// myGraphic.textSize(size)
//
// Sets the text size.
//
// The default size is 1, which means that the text height will span 1 unit in the displayed coordinate system.
//

class TextSize extends RunScript {

    myGraphic: Graphic;

    constructor() {
        super();

        // Make a graphic object
        this.myGraphic = Graphic.make();

        // Add text with default size
        this.myGraphic.text("1 unit");
        this.myGraphic.vertex(0, 5, 2);

        // Add text with size 0.5
        this.myGraphic.text("0.5 units");
        this.myGraphic.textSize(0.5);
        this.myGraphic.vertex(2, 0, 0);

        // Add text with size 2
        this.myGraphic.text("2 units");
        this.myGraphic.textSize(2);
        this.myGraphic.vertex(-2, 10, 4);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    }
}
