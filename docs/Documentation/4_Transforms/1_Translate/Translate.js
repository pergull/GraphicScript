//
// Graphic.translate(x, y, z)
//
// Applies a translation to the display.
//
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
var Translate = (function (_super) {
    __extends(Translate, _super);
    function Translate() {
        var _this = _super.call(this) || this;
        // Make a graphic object
        _this.myGraphic = _this.makeGraphic();
        return _this;
    }
    // GraphicScript display function
    Translate.prototype.graphicDisplay = function () {
        // Translate along the x-axis
        var x = Math.sin(Graphic.time());
        Graphic.translate(x, 0, 0);
        // Draw myGraphic
        Graphic.draw(this.myGraphic);
    };
    // Make a graphic
    Translate.prototype.makeGraphic = function () {
        // Make a new graphic
        var graphic = Graphic.make();
        // Add a cube
        graphic.cuboids();
        graphic.vertex(-1, -1, -1);
        graphic.vertex(1, 1, 1);
        return graphic;
    };
    return Translate;
}(RunScript));
//# sourceMappingURL=Translate.js.map