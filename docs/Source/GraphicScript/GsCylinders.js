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
var GraphicScript;
(function (GraphicScript) {
    var GsCylinders = (function (_super) {
        __extends(GsCylinders, _super);
        function GsCylinders() {
            var _this = _super.call(this) || this;
            _this.graphic = new GraphicScript.GsGraphic();
            _this.hasRadius = true;
            _this.build = true;
            return _this;
        }
        GsCylinders.prototype.render = function () {
            if (this.build) {
                this.doBuild();
            }
            this.graphic.render();
        };
        GsCylinders.prototype.doBuild = function () {
            var slices = 32;
            // Setup temporary transformation matrix to place the cylinder
            gc.pushTransform();
            var vertexIndex;
            var colorIndex;
            var radiusIndex;
            for (vertexIndex = 0, colorIndex = 0, radiusIndex = 0; vertexIndex + 5 < this.vertexData.length; vertexIndex += 6, colorIndex += 8, radiusIndex += 2) {
                var radius0 = this.radiusData[radiusIndex];
                var radius1 = this.radiusData[radiusIndex + 1];
                var x0 = this.vertexData[vertexIndex + 0];
                var y0 = this.vertexData[vertexIndex + 1];
                var z0 = this.vertexData[vertexIndex + 2];
                var x1 = this.vertexData[vertexIndex + 3];
                var y1 = this.vertexData[vertexIndex + 4];
                var z1 = this.vertexData[vertexIndex + 5];
                var dx = x1 - x0;
                var dy = y1 - y0;
                var dz = z1 - z0;
                var length = Math.sqrt(dx * dx + dy * dy + dz * dz);
                var aVec = [];
                aVec[0] = 0.0;
                aVec[1] = 0.0;
                aVec[2] = 1.0;
                var bVec = [];
                bVec[0] = dx;
                bVec[1] = dy;
                bVec[2] = dz;
                this.normalize(bVec);
                dx = aVec[0] - bVec[0];
                dy = aVec[1] - bVec[1];
                dz = aVec[2] - bVec[2];
                var vectorLength = Math.sqrt(dx * dx + dy * dy + dz * dz);
                // Start with identity
                gc.modelview.identity();
                // Translate
                gc.modelview.translate(x0, y0, z0);
                // Rotate
                if (vectorLength > 1.99999) {
                    // Setup temporary transformation matrix to place the cylinder
                    gc.modelview.rotate(180.0, 1.0, 0.0, 0.0);
                }
                else {
                    if (Math.abs(aVec[0] - bVec[0]) > 0.0001 ||
                        Math.abs(aVec[1] - bVec[1]) > 0.0001 ||
                        Math.abs(aVec[2] - bVec[2]) > 0.0001) {
                        var cVec = [];
                        this.cross(aVec, bVec, cVec);
                        if (!(cVec[0] == 0.0 && cVec[1] == 0.0 && cVec[2] == 0.0)) {
                            this.normalize(cVec);
                            var theta = this.angle(aVec, bVec);
                            // Setup temporary transformation matrix to place the cylinder
                            gc.modelview.rotate(theta, cVec[0], cVec[1], cVec[2]);
                        }
                    }
                }
                //
                // Build bottom
                //
                this.graphic.triangleFan();
                this.graphic.color(this.colorData[colorIndex + 0], this.colorData[colorIndex + 1], this.colorData[colorIndex + 2], this.colorData[colorIndex + 3]);
                var vT = [];
                this.mapVertex(0, 0, 0, vT);
                this.graphic.vertex(vT[0], vT[1], vT[2]);
                var sliceAngle = 0.0;
                var sliceAngleInc = Math.PI / slices;
                for (var j = 0; j <= slices; j++) {
                    var x = radius0 * Math.sin(sliceAngle);
                    var y = radius0 * Math.cos(sliceAngle);
                    var z = 0.0;
                    this.graphic.color(this.colorData[colorIndex + 0], this.colorData[colorIndex + 1], this.colorData[colorIndex + 2], this.colorData[colorIndex + 3]);
                    this.mapVertex(x, y, z, vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    sliceAngle += sliceAngleInc * 2.0;
                }
                //
                // Build top
                //
                this.graphic.triangleFan();
                this.graphic.color(this.colorData[colorIndex + 4], this.colorData[colorIndex + 5], this.colorData[colorIndex + 6], this.colorData[colorIndex + 7]);
                this.mapVertex(0, 0, length, vT);
                this.graphic.vertex(vT[0], vT[1], vT[2]);
                sliceAngle = 0.0;
                for (var j = 0; j <= slices; j++) {
                    var x = radius1 * Math.sin(sliceAngle);
                    var y = radius1 * Math.cos(sliceAngle);
                    var z = length;
                    this.graphic.color(this.colorData[colorIndex + 4], this.colorData[colorIndex + 5], this.colorData[colorIndex + 6], this.colorData[colorIndex + 7]);
                    this.mapVertex(x, y, z, vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    sliceAngle += sliceAngleInc * 2.0;
                }
                //
                // Build middle
                //
                this.graphic.triangles();
                var p0 = [];
                var p1 = [];
                var p2 = [];
                var c0 = [];
                var c1 = [];
                sliceAngle = 0.0;
                p0[0] = radius0 * Math.sin(sliceAngle);
                p0[1] = radius0 * Math.cos(sliceAngle);
                p0[2] = 0.0;
                c0[0] = this.colorData[colorIndex + 0];
                c0[1] = this.colorData[colorIndex + 1];
                c0[2] = this.colorData[colorIndex + 2];
                p1[0] = radius1 * Math.sin(sliceAngle);
                p1[1] = radius1 * Math.cos(sliceAngle);
                p1[2] = length;
                c1[0] = this.colorData[colorIndex + 4];
                c1[1] = this.colorData[colorIndex + 5];
                c1[2] = this.colorData[colorIndex + 6];
                sliceAngle += sliceAngleInc * 2.0;
                sliceAngle = 0.0;
                for (var j = 0; j <= slices; j++) {
                    p2[0] = radius1 * Math.sin(sliceAngle);
                    p2[1] = radius1 * Math.cos(sliceAngle);
                    p2[2] = length;
                    this.graphic.color(c0[0], c0[1], c0[2], 1.0);
                    this.mapVertex(p0[0], p0[1], p0[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    this.graphic.color(c1[0], c1[1], c1[2], 1.0);
                    this.mapVertex(p1[0], p1[1], p1[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    this.graphic.color(c1[0], c1[1], c1[2], 1.0);
                    this.mapVertex(p2[0], p2[1], p2[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    p1[0] = p2[0];
                    p1[1] = p2[1];
                    p1[2] = p2[2];
                    p2[0] = radius0 * Math.sin(sliceAngle);
                    p2[1] = radius0 * Math.cos(sliceAngle);
                    p2[2] = 0.0;
                    this.graphic.color(c0[0], c0[1], c0[2], 1.0);
                    this.mapVertex(p0[0], p0[1], p0[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    this.graphic.color(c1[0], c1[1], c1[2], 1.0);
                    this.mapVertex(p1[0], p1[1], p1[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    this.graphic.color(c0[0], c0[1], c0[2], 1.0);
                    this.mapVertex(p2[0], p2[1], p2[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);
                    p0[0] = p2[0];
                    p0[1] = p2[1];
                    p0[2] = p2[2];
                    sliceAngle += sliceAngleInc * 2.0;
                }
            }
            // Restore matrix
            gc.popTransform();
            this.build = false;
        };
        GsCylinders.prototype.normalize = function (c) {
            var r = Math.sqrt(c[0] * c[0] + c[1] * c[1] + c[2] * c[2]);
            if (r == 0.0)
                return;
            c[0] /= r;
            c[1] /= r;
            c[2] /= r;
        };
        GsCylinders.prototype.cross = function (c1, c2, result) {
            result[0] = c1[1] * c2[2] - c1[2] * c2[1];
            result[1] = c1[2] * c2[0] - c1[0] * c2[2];
            result[2] = c1[0] * c2[1] - c1[1] * c2[0];
        };
        GsCylinders.prototype.angle = function (a, b) {
            var a_dot_b = a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
            var theta = Math.acos(a_dot_b / (Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]) * Math.sqrt(b[0] * b[0] + b[1] * b[1] + b[2] * b[2])));
            theta *= (180.0 / Math.PI);
            return theta;
        };
        return GsCylinders;
    }(GraphicScript.GsVertex));
    GraphicScript.GsCylinders = GsCylinders;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsCylinders.js.map