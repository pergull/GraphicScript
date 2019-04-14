var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Robot = (function (_super) {
    __extends(Robot, _super);
    function Robot() {
        var _this = _super.call(this) || this;
        // Robot's shape
        _this.headRadius = 0.5;
        _this.waistRadius = 0.8;
        _this.neckLength = 0.2;
        _this.bodyLength = 1.5;
        _this.armLength = 1.3;
        _this.legLength = 0.5;
        // Robot's colors
        _this.robotColor = [218 / 255, 228 / 255, 234 / 255]; // silver
        _this.eyeColor = [0, 0, 1]; // blue
        // The two graphics objects that will be displayed
        _this.body = Graphic.make();
        _this.head = Graphic.make();
        // Create Robot body and head
        _this.createRobot();
        // View along the x axis
        Graphic.viewDirection(-1, 0, 0);
        // Make the z axis point up
        Graphic.viewUp(0, 0, 1);
        // Don't display bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    Robot.prototype.graphicDisplay = function () {
        // Draw body
        Graphic.draw(this.body);
        // Animate the head
        var degreesPerSec = 45;
        Graphic.rotate(Math.sin(Graphic.time()) * degreesPerSec, 0, 0, 1);
        Graphic.draw(this.head);
    };
    // Function that creates all the Robot body parts
    Robot.prototype.createRobot = function () {
        //
        // Create Robot body
        //
        var body = this.body;
        var head = this.head;
        var robotColor = this.robotColor;
        var eyeColor = this.eyeColor;
        var waistRadius = this.waistRadius;
        var bodyLength = this.bodyLength;
        var armLength = this.armLength;
        var legLength = this.legLength;
        var headRadius = this.headRadius;
        var neckLength = this.neckLength;
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
    };
    return Robot;
}(RunScript));
//# sourceMappingURL=Robot.js.map