var GraphicScript;
(function (GraphicScript) {
    var Sphere = (function () {
        function Sphere() {
            this.center = new GraphicScript.Vector();
            this.clear();
        }
        Sphere.prototype.clear = function () {
            this.center.set(0, 0, 0);
            this.radius = -1;
        };
        Sphere.prototype.copy = function (sphere) {
            this.center.copy(sphere.center);
            this.radius = sphere.radius;
        };
        return Sphere;
    }());
    GraphicScript.Sphere = Sphere;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=Sphere.js.map