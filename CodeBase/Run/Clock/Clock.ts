class Clock extends RunScript {

    // Clock graphics to display
    numbers = Graphic.make();
    hourHand = Graphic.make();
    minuteHand = Graphic.make();
    secondHand = Graphic.make();

    constructor() {
        super();
        
        // Build clock
        this.buildClock();

        // Clock's view direction
        Graphic.viewDirection(0, 0, -1);
        Graphic.viewUp(0, 1, 0);

        // Don't display the bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Get current time
        var date = new Date();

        // Draw clock numbers
        Graphic.draw(this.numbers);

        // Draw clock hour hand
        var angle = 360 / 12 * date.getHours();
        Graphic.pushTransform();
        Graphic.rotate(angle, 0, 0, -1);
        Graphic.draw(this.hourHand);
        Graphic.popTransform();

        // Draw clock minute hand
        angle = 360 / 60 * date.getMinutes();
        Graphic.pushTransform();
        Graphic.rotate(angle, 0, 0, -1);
        Graphic.draw(this.minuteHand);
        Graphic.popTransform();

        // Draw clock second hand
        angle = 360 / 60 * date.getSeconds();
        Graphic.pushTransform();
        Graphic.rotate(angle, 0, 0, -1);
        Graphic.draw(this.secondHand);
        Graphic.popTransform();
    }

    buildClock() {
        // Clock numbers
        this.numbers.color(1, 1, 0);
        var angle = 2 * Math.PI / 12;
        for (var i = 0; i < 12; i++) {
            this.numbers.text((i + 1).toString());
            this.numbers.textSize(0.2);

            // Current number vertex
            var r = 0.8;
            var x = r * Math.sin(angle);
            var y = r * Math.cos(angle);
            this.numbers.vertex(x, y, 0.0);

            // Increment angle for next number
            angle += 2 * Math.PI / 12;
        }

        // Clock hour hand
        this.hourHand.lines();
        this.hourHand.vertex(0, 0, 0);
        this.hourHand.vertex(0, 0.4, 0);

        // Clock minute hand
        this.minuteHand.lines();
        this.minuteHand.vertex(0, 0, 0);
        this.minuteHand.vertex(0, 0.55, 0);

        // Clock second hand
        this.secondHand.lines();
        this.secondHand.vertex(0, 0, 0);
        this.secondHand.vertex(0, 0.65, 0);
    }
}