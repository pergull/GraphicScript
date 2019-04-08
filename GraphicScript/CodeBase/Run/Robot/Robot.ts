class Robot extends RunScript {

    // Robot's shape
    headRadius = 0.5
    waistRadius = 0.8;
    neckLength = 0.2;
    bodyLength = 1.5;
    armLength = 1.3;
    legLength = 0.5;

    // Robot's colors
    robotColor = [218 / 255, 228 / 255, 234 / 255]; // silver
    eyeColor = [0, 0, 1]; // blue

    // The two graphics objects that will be displayed
    body = Graphic.make();
    head = Graphic.make();

    constructor() {
        super();

        // Create Robot body and head
        this.createRobot();

        // View along the x axis
        Graphic.viewDirection(-1, 0, 0);

        // Make the z axis point up
        Graphic.viewUp(0, 0, 1);

        // Don't display bounding box
        Graphic.boundingBox(false);
    }

    // GraphicScript display function
    graphicDisplay() {
        // Draw body
        Graphic.draw(this.body);

        // Animate the head
        var degreesPerSec = 45;
        Graphic.rotate(Math.sin(Graphic.time()) * degreesPerSec, 0, 0, 1);
        Graphic.draw(this.head);
    }

    // Function that creates all the Robot body parts
    createRobot() {
        //
        // Create Robot body
        //

        const body = this.body;
        const head = this.head;
        const robotColor = this.robotColor;
        const eyeColor = this.eyeColor;
        const waistRadius = this.waistRadius;
        const bodyLength = this.bodyLength;
        const armLength = this.armLength;
        const legLength = this.legLength;
        const headRadius = this.headRadius;
        const neckLength = this.neckLength;

        // Tummy
        body.color(robotColor[0], robotColor[1], robotColor[2]);
        body.cylinders();
        body.radius(waistRadius);
        body.vertex(0, 0, 0);
        body.vertex(0, 0, bodyLength);

        // Left arm
        body.color(robotColor[0], robotColor[1], robotColor[2]);
        body.cylinders();
        body.radius(0.2);
        var leftArmOffset = waistRadius + 0.25;
        body.vertex(0, leftArmOffset, bodyLength);
        body.vertex(0, leftArmOffset, bodyLength - armLength);

        // Right arm
        body.color(robotColor[0], robotColor[1], robotColor[2]);
        body.cylinders();
        body.radius(0.2);
        var rightArmOffset = waistRadius + 0.25;
        body.vertex(0, -rightArmOffset, bodyLength);
        body.vertex(0, -rightArmOffset, bodyLength - armLength);

        // Left leg
        body.color(robotColor[0], robotColor[1], robotColor[2]);
        body.cylinders();
        body.radius(0.2);
        var leftLegOffset = 0.5;
        body.vertex(0, leftLegOffset, 0);
        body.vertex(0, leftLegOffset, -legLength);

        // Right leg
        body.color(robotColor[0], robotColor[1], robotColor[2]);
        body.cylinders();
        body.radius(0.2);
        var rightLegOffset = 0.5;
        body.vertex(0, -rightLegOffset, 0);
        body.vertex(0, -rightLegOffset, -legLength);

        // Neck
        body.color(robotColor[0], robotColor[1], robotColor[2]);
        body.cylinders();
        body.radius(headRadius / 2);
        body.vertex(0, 0, bodyLength);
        body.vertex(0, 0, bodyLength + neckLength);

        //
        // Create Robot head
        //

        // Main head
        head.color(robotColor[0], robotColor[1], robotColor[2]);
        head.cuboids();
        head.vertex(-headRadius, -headRadius, bodyLength + neckLength);
        head.vertex(headRadius, headRadius, bodyLength + neckLength + headRadius * 2);

        // Eyes
        head.color(eyeColor[0], eyeColor[1], eyeColor[2]);
        head.spheres();
        head.radius(0.1);
        var eyeOffset = 0.5;
        head.vertex(eyeOffset, -eyeOffset / 2, bodyLength + neckLength + eyeOffset);
        head.vertex(eyeOffset, eyeOffset / 2, bodyLength + neckLength + eyeOffset);
    }
}