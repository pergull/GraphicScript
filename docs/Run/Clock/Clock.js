var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super.call(this) || this;
        // Clock graphics to display
        _this.numbers = Graphic.make();
        _this.hourHand = Graphic.make();
        _this.minuteHand = Graphic.make();
        _this.secondHand = Graphic.make();
        // Build clock
        _this.buildClock();
        // Clock's view direction
        Graphic.viewDirection(0, 0, -1);
        Graphic.viewUp(0, 1, 0);
        // Don't display the bounding box
        Graphic.boundingBox(false);
        return _this;
    }
    // GraphicScript display function
    Clock.prototype.graphicDisplay = function () {
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
    };
    Clock.prototype.buildClock = function () {
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
    };
    return Clock;
}(RunScript));
//# sourceMappingURL=Clock.js.map