module GraphicScript {

    export class Vector {

        x; y; z;

        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        set(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        copy(v: Vector) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
        }

        add(v: Vector) {
            return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
        }

        subtract(v: Vector) {
            return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
        }

        scale(s: number) {
            return new Vector(this.x * s, this.y * s, this.z * s);
        }

        negative() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;

            return this;
        }

        dot(v: Vector) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }

        cross(v: Vector) {
            return new Vector(
                this.y * v.z - this.z * v.y,
                this.z * v.x - this.x * v.z,
                this.x * v.y - this.y * v.x);
        }

        clone() {
            return new Vector(this.x, this.y, this.z);
        }

        normalizeInPlace() {
            var r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
            if (r == 0.0) return;

            this.x /= r;
            this.y /= r;
            this.z /= r;

            return this;
        }

        static distance(v0: Vector, v1: Vector) {
            var dx = v1.x - v0.x;
            var dy = v1.y - v0.y;
            var dz = v1.z - v0.z;

            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }

        // TODO - static?
        static normalizeStatic(c) {
            var r = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]);
            if (r == 0.0) return;

            c[0] /= r;
            c[1] /= r;
            c[2] /= r;
        }

        // TODO - static?
        static crossStatic(c1, c2, result) {
            result[0] = c1[1] * c2[2] - c1[2] * c2[1];
            result[1] = c1[2] * c2[0] - c1[0] * c2[2];
            result[2] = c1[0] * c2[1] - c1[1] * c2[0];
        }
    }
}