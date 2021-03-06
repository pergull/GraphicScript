module GraphicScript {

    export class Text {

        MODE_2D = 0;
        MODE_3D = 1;

        static LEFT_BOTTOM = 0;
        static CENTER_BOTTOM = 1;
        static RIGHT_BOTTOM = 2;
        static LEFT_CENTER = 3;
        static CENTER_CENTER = 4;
        static RIGHT_CENTER = 5;
        static LEFT_TOP = 6;
        static CENTER_TOP = 7;
        static RIGHT_TOP = 8;

        mode; // 2D or 3D
        position = [];
        color = [];
        path = [];
        up = [];
        scale = [3]; // Only support flat (2D) fonts.  i.e. no z-scale required
        alignment;
        font: Font;
        text;
        data;
        textMatrix;
        currentMatrix;
        dirty;
        v1 = [];
        v2 = [];
        vn = [];
        alignmentOffset = [];

        constructor(
            xPosition, yPosition, zPosition,
            xPath, yPath,
            xScale, yScale,
            alignment,
            font,
            text) {

            this.init();

            this.mode = this.MODE_2D;

            this.textMatrix = new Matrix();
            this.currentMatrix = new Matrix();

            this.position[0] = xPosition;
            this.position[1] = yPosition;
            this.position[2] = zPosition;

            this.path[0] = xPath;
            this.path[1] = yPath;
            this.path[2] = 0.0;

            this.up[0] = 0.0;
            this.up[1] = 1.0;
            this.up[2] = 0.0;

            this.scale[0] = xScale;
            this.scale[1] = yScale;

            this.alignment = alignment;
            this.font = font;
            this.text = text;

            this.dirty = true;
        }

        init() {
            this.data = null;
        }

        render() {
            if (this.dirty) {
                this.Setup();
            }

            switch (this.mode) {

                case this.MODE_2D:
                    {
                        // Save current matrix
                        gc.pushTransform();

                        //
                        // Fill in the translation portion of "textMatrix" based
                        // on the current matrix
                        //
                        // NOTE: The other "textMatrix" components were defined
                        //       in setup()
                        //

                        var m = gc.modelview.m;
                        this.textMatrix.m[12] = m[0] * this.position[0] + m[4] * this.position[1] +
                        m[8] * this.position[2] + m[12];
                        this.textMatrix.m[13] = m[1] * this.position[0] + m[5] * this.position[1] +
                        m[9] * this.position[2] + m[13];
                        this.textMatrix.m[14] = m[2] * this.position[0] + m[6] * this.position[1] +
                        m[10] * this.position[2] + m[14];

                        //
                        // Replace current matrix with "textMatrix"
                        //

                        gc.modelview.identity();
                        gc.modelview.multiplyWith(this.textMatrix);

                        //
                        // Rotate text according to "path"
                        //

                        this.v1[0] = 1.0;
                        this.v1[1] = 0.0;
                        this.v1[2] = 0.0;
                        this.v2[0] = this.path[0];
                        this.v2[1] = this.path[1];
                        this.v2[2] = 0.0;
                        var theta = this.Angle(this.v1, this.v2);
                        if (theta < 0.0001 || theta > 179.9999) {
                            this.vn[0] = 0.0;
                            this.vn[1] = 0.0;
                            this.vn[2] = 1.0;
                        }
                        else {
                            this.Cross(this.v1, this.v2, this.vn);
                        }
                        gc.modelview.rotate(theta, this.vn[0], this.vn[1], this.vn[2]);

                        //
                        // Scale text according to "scale"
                        //

                        gc.modelview.scale(this.scale[0], this.scale[1], 1.0);

                        //
                        // Render
                        //

                        gc.updateMatrix();
                        this.data.render();

                        // Restore current matrix
                        gc.popTransform();
                        gc.updateMatrix();
                    }
                    break;

                case this.MODE_3D:
                    {
                    }
            }
        }

        Position(x, y, z) {
            this.position[0] = x;
            this.position[1] = y;
            this.position[2] = z;
            this.dirty = true;
        }

        Scale(x, y) {
            this.scale[0] = x;
            this.scale[1] = y;
            this.dirty = true;
        }

        Path(x, y) {
            this.path[0] = x;
            this.path[1] = y;
            this.dirty = true;
        }

        Color(r, g, b) {
            this.color[0] = r;
            this.color[1] = g;
            this.color[2] = b;
            this.dirty = true;
        }

        Text(text) {
            this.text = text;
            this.dirty = true;
        }

        Setup() {
            switch (this.alignment) {

                case Text.LEFT_BOTTOM:
                    this.alignmentOffset[0] = 0.0;
                    this.alignmentOffset[1] = 0.0;
                    break;

                case Text.CENTER_BOTTOM:
                    this.alignmentOffset[0] = -this.font.stringXSize(this.text) / 2.0;
                    this.alignmentOffset[1] = 0.0;
                    break;

                case Text.RIGHT_BOTTOM:
                    this.alignmentOffset[0] = -this.font.stringXSize(this.text);
                    this.alignmentOffset[1] = 0.0;
                    break;

                case Text.LEFT_CENTER:
                    this.alignmentOffset[0] = 0.0;
                    this.alignmentOffset[1] = -this.font.stringYSize(this.text) / 2.0;
                    break;

                case Text.CENTER_CENTER:
                    this.alignmentOffset[0] = -this.font.stringXSize(this.text) / 2.0;
                    this.alignmentOffset[1] = -this.font.stringYSize(this.text) / 2.0;
                    break;

                case Text.RIGHT_CENTER:
                    this.alignmentOffset[0] = -this.font.stringXSize(this.text);
                    this.alignmentOffset[1] = -this.font.stringYSize(this.text) / 2.0;
                    break;

                case Text.LEFT_TOP:
                    this.alignmentOffset[0] = 0.0;
                    this.alignmentOffset[1] = -this.font.stringYSize(this.text);
                    break;

                case Text.CENTER_TOP:
                    this.alignmentOffset[0] = -this.font.stringXSize(this.text) / 2.0;
                    this.alignmentOffset[1] = -this.font.stringYSize(this.text);
                    break;

                case Text.RIGHT_TOP:
                    this.alignmentOffset[0] = -this.font.stringXSize(this.text);
                    this.alignmentOffset[1] = -this.font.stringYSize(this.text);
                    break;
            }

            // Create the text data
            this.data = this.font.makeText(this.alignmentOffset[0], this.alignmentOffset[1], this.text, this.color[0], this.color[1], this.color[2]);

            // Setup "textMatrix"
            switch (this.mode) {

                case this.MODE_2D:
                    {
                        //
                        // Set known values for "textMatrix".  The
                        // rest (i.e. m[12], m[13] and m[14]) will
                        // have to be calculated based on the
                        // current matrix at render time.
                        //

                        var m = this.textMatrix.m;

                        m[0] = 1.0; m[4] = 0.0; m[8] = 0.0;
                        m[1] = 0.0; m[5] = 1.0; m[9] = 0.0;
                        m[2] = 0.0; m[6] = 0.0; m[10] = 1.0;
                        m[3] = 0.0; m[7] = 0.0; m[11] = 0.0; m[15] = 1.0;
                    }
                    break;

                case this.MODE_3D:
                    {
                    }
                    break;
            }

            this.dirty = false;
        }

        Angle(u, v) {
            var acosArg = (u[0] * v[0] + u[1] * v[1] + u[2] * v[2]) /
                (Math.sqrt(u[0] * u[0] + u[1] * u[1] + u[2] * u[2]) *
                Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]));

            if (acosArg <= -1.0)  // catch roundoff errors
                return 180.0;
            if (acosArg >= 1.0)   // catch roundoff errors
                return 0.0;
            else {
                var pi = Math.atan(1.0) * 4.0;
                return Math.acos(acosArg) * 180.0 / pi;
            }
        }

        Cross(c1, c2, result) {
            result[0] = c1[1] * c2[2] - c1[2] * c2[1];
            result[1] = c1[2] * c2[0] - c1[0] * c2[2];
            result[2] = c1[0] * c2[1] - c1[1] * c2[0];
        }
    }
}