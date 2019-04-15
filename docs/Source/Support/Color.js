var GraphicScript;
(function (GraphicScript) {
    var Color = /** @class */ (function () {
        function Color(r, g, b, a) {
            if (r === void 0) { r = -1; }
            if (g === void 0) { g = -1; }
            if (b === void 0) { b = -1; }
            if (a === void 0) { a = 1; }
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.prototype.set = function (r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        };
        Color.prototype.setDefault = function () {
            this.r = -1;
            this.g = -1;
            this.b = -1;
            this.a = 1;
        };
        return Color;
    }());
    GraphicScript.Color = Color;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=Color.js.map