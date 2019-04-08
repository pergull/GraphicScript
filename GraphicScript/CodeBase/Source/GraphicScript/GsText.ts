module GraphicScript {

    export class GsText extends GsVertex {

        textStr: string;
        textFont: Text = null;

        xPath = 1;
        yPath = 0;

        constructor(str: string) {
            super();

            this.hasTextSize = true;
            this.textStr = str;
        }

        render() {
            switch (gc.renderMode) {
                case RenderMode.Render:
                    {
                        if (this.textFont == null) {
                            this.textFont = new Text(0.0, 0.0, 0.0,
                                1.0, 0.0,
                                1.0, 1.0,
                                Text.CENTER_CENTER,
                                new Font(),
                                "");
                        }

                        var vertexIndex;
                        var colorIndex;
                        var textSizeIndex;
                        for (vertexIndex = 0, colorIndex = 0, textSizeIndex = 0;
                            vertexIndex < this.vertexData.length;
                            vertexIndex += 3, colorIndex += 4, textSizeIndex++) {

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

                case RenderMode.BoundBox:
                    {
                        this.calcBoundBox();
                        break;
                    }
            }
        }
    }
}