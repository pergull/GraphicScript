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
    var GsLineStrip = (function (_super) {
        __extends(GsLineStrip, _super);
        function GsLineStrip() {
            return _super.call(this) || this;
        }
        GsLineStrip.prototype.render = function () {
            switch (gc.renderMode) {
                case GraphicScript.RenderMode.Render:
                    {
                        if (this.arrayBufferDirty) {
                            this.updateArrayBuffer();
                        }
                        gc.shaderColorVertex.bind(this.arrayBufferId);
                        gc.shaderColorVertex.updateModelViewProjection(gc.modelViewProjection.m);
                        gc.gl.drawArrays(gc.gl.LINE_STRIP, 0, this.vertexData.length);
                        break;
                    }
                case GraphicScript.RenderMode.BoundBox:
                    {
                        this.calcBoundBox();
                        break;
                    }
            }
        };
        return GsLineStrip;
    }(GraphicScript.GsVertex));
    GraphicScript.GsLineStrip = GsLineStrip;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsLineStrip.js.map