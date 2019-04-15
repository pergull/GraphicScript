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
    var GsText = /** @class */ (function (_super) {
        __extends(GsText, _super);
        function GsText(str) {
            var _this = _super.call(this) || this;
            _this.textFont = null;
            _this.xPath = 1;
            _this.yPath = 0;
            _this.hasTextSize = true;
            _this.textStr = str;
            return _this;
        }
        GsText.prototype.render = function () {
            switch (gc.renderMode) {
                case GraphicScript.RenderMode.Render:
                    {
                        if (this.textFont == null) {
                            this.textFont = new GraphicScript.Text(0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, GraphicScript.Text.CENTER_CENTER, new GraphicScript.Font(), "");
                        }
                        var vertexIndex;
                        var colorIndex;
                        var textSizeIndex;
                        for (vertexIndex = 0, colorIndex = 0, textSizeIndex = 0; vertexIndex < this.vertexData.length; vertexIndex += 3, colorIndex += 4, textSizeIndex++) {
                            var textSize = this.textSizeData[textSizeIndex];
                            var x = this.vertexData[vertexIndex + 0];
                            var y = this.vertexData[vertexIndex + 1];
                            var z = this.vertexData[vertexIndex + 2];
                            var r = this.colorData[colorIndex + 0];
                            var g = this.colorData[colorIndex + 1];
                            var b = this.colorData[colorIndex + 2];
                            this.textFont.Position(x, y, z);
                            this.textFont.Scale(textSize, textSize);
                            this.textFont.Path(this.xPath, this.yPath);
                            this.textFont.Color(r, g, b);
                            this.textFont.Text(this.textStr);
                            this.textFont.render();
                        }
                        break;
                    }
                case GraphicScript.RenderMode.BoundBox:
                    {
                        this.calcBoundBox();
                        break;
                    }
            }
        };
        return GsText;
    }(GraphicScript.GsVertex));
    GraphicScript.GsText = GsText;
})(GraphicScript || (GraphicScript = {}));
//# sourceMappingURL=GsText.js.map