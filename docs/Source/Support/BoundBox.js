var GraphicScript;
(function (GraphicScript) {
    var BoundBox = /** @class */ (function () {
        function BoundBox() {
            this.min = new GraphicScript.Vector();
            this.max = new GraphicScript.Vector();
            this.clear();
        }
        BoundBox.prototype.clear = function () {
            this.min.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
            this.max.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        };
        return BoundBox;
    }());
    GraphicScript.BoundBox = BoundBox;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=BoundBox.js.map