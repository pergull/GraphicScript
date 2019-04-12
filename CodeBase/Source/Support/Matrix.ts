module GraphicScript {

    export class Matrix {

        m: Float32Array;
        t: Float32Array;  // temp
        r: Float32Array;  // result

        mStack: Float32Array[] = [];

        constructor() {
            this.m = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            this.t = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
            this.r = new Float32Array([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]);
        }

        push() {
            var m = this.m;

            this.mStack.push(new Float32Array([
                m[0], m[1], m[2], m[3],
                m[4], m[5], m[6], m[7],
                m[8], m[9], m[10], m[11],
                m[12], m[13], m[14], m[15]
            ]));
        }

        pop() {
            if (this.mStack.length > 0) {
                this.m = this.mStack.pop();
            }
        }

        load(matrix: number[]) {
            var m = this.m;

            m[0] = matrix[0]; m[1] = matrix[1]; m[2] = matrix[2]; m[3] = matrix[3];
            m[4] = matrix[4]; m[5] = matrix[5]; m[6] = matrix[6]; m[7] = matrix[7];
            m[8] = matrix[8]; m[9] = matrix[9]; m[10] = matrix[10]; m[11] = matrix[11];
            m[12] = matrix[12]; m[13] = matrix[13]; m[14] = matrix[14]; m[15] = matrix[15];
        }

        identity() {
            var m = this.m;

            m[0] = 1.0; m[1] = 0.0; m[2] = 0.0; m[3] = 0.0;
            m[4] = 0.0; m[5] = 1.0; m[6] = 0.0; m[7] = 0.0;
            m[8] = 0.0; m[9] = 0.0; m[10] = 1.0; m[11] = 0.0;
            m[12] = 0.0; m[13] = 0.0; m[14] = 0.0; m[15] = 1.0;
        }

        translate(tx: number, ty: number, tz: number) {
            var t = this.t;

            t[0] = 1.0; t[4] = 0.0; t[8] = 0.0; t[12] = tx;
            t[1] = 0.0; t[5] = 1.0; t[9] = 0.0; t[13] = ty;
            t[2] = 0.0; t[6] = 0.0; t[10] = 1.0; t[14] = tz;
            t[3] = 0.0; t[7] = 0.0; t[11] = 0.0; t[15] = 1.0;

            this.multiply();
        }

        scale(sx: number, sy: number, sz: number) {
            var t = this.t;
            t[0] = sx; t[4] = 0.0; t[8] = 0.0; t[12] = 0.0;
            t[1] = 0.0; t[5] = sy; t[9] = 0.0; t[13] = 0.0;
            t[2] = 0.0; t[6] = 0.0; t[10] = sz; t[14] = 0.0;
            t[3] = 0.0; t[7] = 0.0; t[11] = 0.0; t[15] = 1.0;

            this.multiply();
        }

        rotate(angle: number, rx: number, ry: number, rz: number) {
            var t = this.t;

            // convert to radians
            angle = angle * Math.PI / 180.0;

            // normalize
            var factor = Math.sqrt(rx * rx + ry * ry + rz * rz);
            rx = rx / factor;
            ry = ry / factor;
            rz = rz / factor;

            // pre-calc
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var one_minus_c = 1.0 - c;

            t[0] = rx * rx * one_minus_c + c;
            t[1] = ry * rx * one_minus_c + rz * s;
            t[2] = rx * rz * one_minus_c - ry * s;
            t[3] = 0.0;
            t[4] = rx * ry * one_minus_c - rz * s;
            t[5] = ry * ry * one_minus_c + c;
            t[6] = ry * rz * one_minus_c + rx * s;
            t[7] = 0.0;
            t[8] = rx * rz * one_minus_c + ry * s;
            t[9] = ry * rz * one_minus_c - rx * s;
            t[10] = rz * rz * one_minus_c + c;
            t[11] = 0.0;
            t[12] = 0.0;
            t[13] = 0.0;
            t[14] = 0.0;
            t[15] = 1.0;

            this.multiply();
        }

        lookAt(eyeX: number, eyeY: number, eyeZ: number,
            centerX: number, centerY: number, centerZ: number,
            upX: number, upY: number, upZ: number) {

            var t = this.t;

            var forward = [];
            forward[0] = centerX - eyeX;
            forward[1] = centerY - eyeY;
            forward[2] = centerZ - eyeZ;
            Vector.normalizeStatic(forward);

            var up = [];
            up[0] = upX;
            up[1] = upY;
            up[2] = upZ;
            Vector.normalizeStatic(up);

            // side = forward x up
            var side = [];
            Vector.crossStatic(forward, up, side);
            Vector.normalizeStatic(side);

            // Recompute up as: up = side x forward
            Vector.crossStatic(side, forward, up);

            // define t as
            t[0] = side[0];
            t[1] = up[0];
            t[2] = -forward[0];
            t[3] = 0.0;

            t[4] = side[1];
            t[5] = up[1];
            t[6] = -forward[1];
            t[7] = 0.0;

            t[8] = side[2];
            t[9] = up[2];
            t[10] = -forward[2];
            t[11] = 0.0;

            t[12] = 0.0;
            t[13] = 0.0;
            t[14] = 0.0;
            t[15] = 1.0;

            this.multiply();
            this.translate(-eyeX, -eyeY, -eyeZ);
        }

        ortho(left: number, right: number,
            bottom: number, top: number,
            zNear: number, zFar: number) {

            var t = this.t;

            t[0] = 2.0 / (right - left);
            t[1] = 0.0;
            t[2] = 0.0;
            t[3] = 0.0;

            t[4] = 0.0;
            t[5] = 2.0 / (top - bottom);
            t[6] = 0.0;
            t[7] = 0.0;

            t[8] = 0.0;
            t[9] = 0.0;
            t[10] = -2.0 / (zFar - zNear);
            t[11] = 0.0;

            t[12] = -(right + left) / (right - left);
            t[13] = -(top + bottom) / (top - bottom);
            t[14] = -(zFar + zNear) / (zFar - zNear);
            t[15] = 1.0;

            this.multiply();
        }

        frustum(left: number, right: number,
            bottom: number, top: number,
            zNear: number, zFar: number) {

            var t = this.t;

            t[0] = (2.0 * zNear) / (right - left);
            t[1] = 0.0;
            t[2] = 0.0;
            t[3] = 0.0;

            t[4] = 0.0;
            t[5] = (2.0 * zNear) / (top - bottom);
            t[6] = 0.0;
            t[7] = 0.0;

            t[8] = (right + left) / (right - left);
            t[9] = (top + bottom) / (top - bottom);
            t[10] = -(zFar + zNear) / (zFar - zNear);
            t[11] = -1.0;

            t[12] = 0.0;
            t[13] = 0.0;
            t[14] = -(2.0 * zFar * zNear) / (zFar - zNear);
            t[15] = 0.0;

            this.multiply();
        }

        perspective(fovy: number, aspect: number,
            zNear: number, zFar: number) {

            var xmin, xmax, ymin, ymax;

            ymax = zNear * Math.tan(fovy * Math.PI / 360.0);
            ymin = -ymax;

            xmin = ymin * aspect;
            xmax = ymax * aspect;

            this.frustum(xmin, xmax, ymin, ymax, zNear, zFar);
        }

        multiply() {
            var m = this.m;
            var t = this.t;
            var r = this.r;

            r[0] = m[0] * t[0] + m[4] * t[1] + m[8] * t[2] + m[12] * t[3];
            r[1] = m[1] * t[0] + m[5] * t[1] + m[9] * t[2] + m[13] * t[3];
            r[2] = m[2] * t[0] + m[6] * t[1] + m[10] * t[2] + m[14] * t[3];
            r[3] = m[3] * t[0] + m[7] * t[1] + m[11] * t[2] + m[15] * t[3];

            r[4] = m[0] * t[4] + m[4] * t[5] + m[8] * t[6] + m[12] * t[7];
            r[5] = m[1] * t[4] + m[5] * t[5] + m[9] * t[6] + m[13] * t[7];
            r[6] = m[2] * t[4] + m[6] * t[5] + m[10] * t[6] + m[14] * t[7];
            r[7] = m[3] * t[4] + m[7] * t[5] + m[11] * t[6] + m[15] * t[7];

            r[8] = m[0] * t[8] + m[4] * t[9] + m[8] * t[10] + m[12] * t[11];
            r[9] = m[1] * t[8] + m[5] * t[9] + m[9] * t[10] + m[13] * t[11];
            r[10] = m[2] * t[8] + m[6] * t[9] + m[10] * t[10] + m[14] * t[11];
            r[11] = m[3] * t[8] + m[7] * t[9] + m[11] * t[10] + m[15] * t[11];

            r[12] = m[0] * t[12] + m[4] * t[13] + m[8] * t[14] + m[12] * t[15];
            r[13] = m[1] * t[12] + m[5] * t[13] + m[9] * t[14] + m[13] * t[15];
            r[14] = m[2] * t[12] + m[6] * t[13] + m[10] * t[14] + m[14] * t[15];
            r[15] = m[3] * t[12] + m[7] * t[13] + m[11] * t[14] + m[15] * t[15];

            for (var i = 0; i < 16; i++) {
                m[i] = r[i];
            }
        }

        multiplyWith(m2: Matrix) {

            var t = this.t;

            for (var i = 0; i < 16; i++) {
                t[i] = m2.m[i];
            }

            this.multiply();
        }

        inverse(m2) {

            var m = this.m;

            for (var i = 0; i < 16; i++) {
                m[i] = m2.m[i];
            }

            if (!this.invertMatrix()) {
                // singular, so set to identity
                this.identity();
            }
        }

        invertMatrix() {

            var m = this.m;

            var m00 = m[0];
            var m01 = m[1];
            var m02 = m[2];
            var m03 = m[3];
            var m10 = m[4];
            var m11 = m[5];
            var m12 = m[6];
            var m13 = m[7];
            var m20 = m[8];
            var m21 = m[9];
            var m22 = m[10];
            var m23 = m[11];
            var m30 = m[12];
            var m31 = m[13];
            var m32 = m[14];
            var m33 = m[15];

            var wtmp =
                [[0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0]];

            var m0, m1, m2, m3, s;
            var r0, r1, r2, r3;
            var rTmp;

            r0 = wtmp[0]; r1 = wtmp[1]; r2 = wtmp[2]; r3 = wtmp[3];

            r0[0] = m00; r0[1] = m01;
            r0[2] = m02; r0[3] = m03;
            r0[4] = 1.0; r0[5] = r0[6] = r0[7] = 0.0;

            r1[0] = m10; r1[1] = m11;
            r1[2] = m12; r1[3] = m13;
            r1[5] = 1.0; r1[4] = r1[6] = r1[7] = 0.0;

            r2[0] = m20; r2[1] = m21;
            r2[2] = m22; r2[3] = m23;
            r2[6] = 1.0; r2[4] = r2[5] = r2[7] = 0.0;

            r3[0] = m30; r3[1] = m31;
            r3[2] = m32; r3[3] = m33;
            r3[7] = 1.0; r3[4] = r3[5] = r3[6] = 0.0;

            // choose pivot - or die
            if (Math.abs(r3[0]) > Math.abs(r2[0])) { rTmp = r3; r3 = r2; r2 = rTmp; }
            if (Math.abs(r2[0]) > Math.abs(r1[0])) { rTmp = r2; r2 = r1; r1 = rTmp; }
            if (Math.abs(r1[0]) > Math.abs(r0[0])) { rTmp = r1; r1 = r0; r0 = rTmp; }
            if (0.0 == r0[0]) return false;

            // eliminate first variable
            m1 = r1[0] / r0[0]; m2 = r2[0] / r0[0]; m3 = r3[0] / r0[0];
            s = r0[1]; r1[1] -= m1 * s; r2[1] -= m2 * s; r3[1] -= m3 * s;
            s = r0[2]; r1[2] -= m1 * s; r2[2] -= m2 * s; r3[2] -= m3 * s;
            s = r0[3]; r1[3] -= m1 * s; r2[3] -= m2 * s; r3[3] -= m3 * s;
            s = r0[4];
            if (s != 0.0) { r1[4] -= m1 * s; r2[4] -= m2 * s; r3[4] -= m3 * s; }
            s = r0[5];
            if (s != 0.0) { r1[5] -= m1 * s; r2[5] -= m2 * s; r3[5] -= m3 * s; }
            s = r0[6];
            if (s != 0.0) { r1[6] -= m1 * s; r2[6] -= m2 * s; r3[6] -= m3 * s; }
            s = r0[7];
            if (s != 0.0) { r1[7] -= m1 * s; r2[7] -= m2 * s; r3[7] -= m3 * s; }

            // choose pivot - or die
            if (Math.abs(r3[1]) > Math.abs(r2[1])) { rTmp = r3; r3 = r2; r2 = rTmp; };
            if (Math.abs(r2[1]) > Math.abs(r1[1])) { rTmp = r2; r2 = r1; r1 = rTmp; };
            if (0.0 == r1[1]) return false;

            // eliminate second variable
            m2 = r2[1] / r1[1]; m3 = r3[1] / r1[1];
            r2[2] -= m2 * r1[2]; r3[2] -= m3 * r1[2];
            r2[3] -= m2 * r1[3]; r3[3] -= m3 * r1[3];
            s = r1[4]; if (0.0 != s) { r2[4] -= m2 * s; r3[4] -= m3 * s; }
            s = r1[5]; if (0.0 != s) { r2[5] -= m2 * s; r3[5] -= m3 * s; }
            s = r1[6]; if (0.0 != s) { r2[6] -= m2 * s; r3[6] -= m3 * s; }
            s = r1[7]; if (0.0 != s) { r2[7] -= m2 * s; r3[7] -= m3 * s; }

            // choose pivot - or die
            if (Math.abs(r3[2]) > Math.abs(r2[2])) { rTmp = r3; r3 = r2; r2 = rTmp; };
            if (0.0 == r2[2]) return false;

            // eliminate third variable
            m3 = r3[2] / r2[2];
            r3[3] -= m3 * r2[3]; r3[4] -= m3 * r2[4];
            r3[5] -= m3 * r2[5]; r3[6] -= m3 * r2[6];
            r3[7] -= m3 * r2[7];

            // last check
            if (0.0 == r3[3]) return false;

            s = 1.0 / r3[3];              // now back substitute row 3
            r3[4] *= s; r3[5] *= s; r3[6] *= s; r3[7] *= s;

            m2 = r2[3];                 // now back substitute row 2
            s = 1.0 / r2[2];
            r2[4] = s * (r2[4] - r3[4] * m2); r2[5] = s * (r2[5] - r3[5] * m2);
            r2[6] = s * (r2[6] - r3[6] * m2); r2[7] = s * (r2[7] - r3[7] * m2);
            m1 = r1[3];
            r1[4] -= r3[4] * m1; r1[5] -= r3[5] * m1;
            r1[6] -= r3[6] * m1; r1[7] -= r3[7] * m1;
            m0 = r0[3];
            r0[4] -= r3[4] * m0; r0[5] -= r3[5] * m0;
            r0[6] -= r3[6] * m0; r0[7] -= r3[7] * m0;

            m1 = r1[2];                 // now back substitute row 1
            s = 1.0 / r1[1];
            r1[4] = s * (r1[4] - r2[4] * m1); r1[5] = s * (r1[5] - r2[5] * m1);
            r1[6] = s * (r1[6] - r2[6] * m1); r1[7] = s * (r1[7] - r2[7] * m1);
            m0 = r0[2];
            r0[4] -= r2[4] * m0; r0[5] -= r2[5] * m0;
            r0[6] -= r2[6] * m0; r0[7] -= r2[7] * m0;

            m0 = r0[1];                 // now back substitute row 0
            s = 1.0 / r0[0];
            r0[4] = s * (r0[4] - r1[4] * m0); r0[5] = s * (r0[5] - r1[5] * m0);
            r0[6] = s * (r0[6] - r1[6] * m0); r0[7] = s * (r0[7] - r1[7] * m0);

            m[0] = r0[4];
            m[1] = r0[5];
            m[2] = r0[6];
            m[3] = r0[7];
            m[4] = r1[4];
            m[5] = r1[5];
            m[6] = r1[6];
            m[7] = r1[7];
            m[8] = r2[4];
            m[9] = r2[5];
            m[10] = r2[6];
            m[11] = r2[7];
            m[12] = r3[4];
            m[13] = r3[5];
            m[14] = r3[6];
            m[15] = r3[7];

            return true;
        }
    }
}