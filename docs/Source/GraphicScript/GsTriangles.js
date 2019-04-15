var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GraphicScript;
(function (GraphicScript) {
    var GsTriangles = /** @class */ (function (_super) {
        __extends(GsTriangles, _super);
        function GsTriangles() {
            return _super.call(this) || this;
        }
        GsTriangles.prototype.render = function () {
            switch (gc.renderMode) {
                case GraphicScript.RenderMode.Render:
                    {
                        if (this.updateNormals) {
                            this.calcNormals();
                        }
                        if (this.arrayBufferDirty) {
                            this.updateArrayBuffer();
                        }
                        gc.shaderColorNormalVertex.bind(this.arrayBufferId);
                        gc.shaderColorNormalVertex.updateModelViewProjection(gc.modelViewProjection.m);
                        gc.shaderColorNormalVertex.updateModelViewInverse(gc.modelviewInverse.m);
                        gc.shaderColorNormalVertex.updateRainbowLight(this.rainbowLight);
                        gc.gl.drawArrays(gc.gl.TRIANGLES, 0, this.vertexData.length);
                        break;
                    }
                case GraphicScript.RenderMode.BoundBox:
                    {
                        this.calcBoundBox();
                        break;
                    }
            }
        };
        return GsTriangles;
    }(GraphicScript.GsVertex));
    GraphicScript.GsTriangles = GsTriangles;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsTriangles.js.map