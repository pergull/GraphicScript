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
    var GsLines = /** @class */ (function (_super) {
        __extends(GsLines, _super);
        function GsLines() {
            return _super.call(this) || this;
        }
        GsLines.prototype.render = function () {
            switch (gc.renderMode) {
                case GraphicScript.RenderMode.Render:
                    {
                        if (this.arrayBufferDirty) {
                            this.updateArrayBuffer();
                        }
                        gc.shaderColorVertex.bind(this.arrayBufferId);
                        gc.shaderColorVertex.updateModelViewProjection(gc.modelViewProjection.m);
                        gc.gl.drawArrays(gc.gl.LINES, 0, this.vertexData.length);
                        break;
                    }
                case GraphicScript.RenderMode.BoundBox:
                    {
                        this.calcBoundBox();
                        break;
                    }
            }
        };
        return GsLines;
    }(GraphicScript.GsVertex));
    GraphicScript.GsLines = GsLines;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsLines.js.map