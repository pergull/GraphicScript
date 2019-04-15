var GraphicScript;
(function (GraphicScript) {
    var Vector = /** @class */ (function () {
        function Vector(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vector.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        Vector.prototype.copy = function (v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        };
        Vector.prototype.add = function (v) {
            return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        };
        Vector.prototype.subtract = function (v) {
            return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        };
        Vector.prototype.scale = function (s) {
            return new Vector(this.x * s, this.y * s, this.z * s);
        };
        Vector.prototype.negative = function () {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this;
        };
        Vector.prototype.dot = function (v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        };
        Vector.prototype.cross = function (v) {
            return new Vector(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
        };
        Vector.prototype.clone = function () {
            return new Vector(this.x, this.y, this.z);
        };
        Vector.prototype.normalizeInPlace = function () {
            var r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            if (r == 0.0)
                return;
            this.x /= r;
            this.y /= r;
            this.z /= r;
            return this;
        };
        Vector.distance = function (v0, v1) {
            var dx = v1.x - v0.x;
            var dy = v1.y - v0.y;
            var dz = v1.z - v0.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        };
        // TODO - static?
        Vector.normalizeStatic = function (c) {
            var r = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]);
            if (r == 0.0)
                return;
            c[0] /= r;
            c[1] /= r;
            c[2] /= r;
        };
        // TODO - static?
        Vector.crossStatic = function (c1, c2, result) {
            result[0] = c1[1] * c2[2] - c1[2] * c2[1];
            result[1] = c1[2] * c2[0] - c1[0] * c2[2];
            result[2] = c1[0] * c2[1] - c1[1] * c2[0];
        };
        return Vector;
    }());
    GraphicScript.Vector = Vector;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=Vector.js.map