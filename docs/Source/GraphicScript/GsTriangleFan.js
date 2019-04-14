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
    var GsTriangleFan = (function (_super) {
        __extends(GsTriangleFan, _super);
        function GsTriangleFan() {
            return _super.call(this) || this;
        }
        GsTriangleFan.prototype.vertex = function (x, y, z) {
            if (this.vertexData.length > 8) {
                var x0Index = 0;
                var x1Index = this.vertexData.length - 3;
                var x0 = this.vertexData[x0Index];
                var y0 = this.vertexData[x0Index + 1];
                var z0 = this.vertexData[x0Index + 2];
                var x1 = this.vertexData[x1Index];
                var y1 = this.vertexData[x1Index + 1];
                var z1 = this.vertexData[x1Index + 2];
                _super.prototype.vertex.call(this, x0, y0, z0);
                _super.prototype.vertex.call(this, x1, y1, z1);
                _super.prototype.vertex.call(this, x, y, z);
            }
            else {
                _super.prototype.vertex.call(this, x, y, z);
            }
        };
        return GsTriangleFan;
    }(GraphicScript.GsTriangles));
    GraphicScript.GsTriangleFan = GsTriangleFan;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsTriangleFan.js.map