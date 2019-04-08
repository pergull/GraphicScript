module GraphicScript {

    export class GsSpheres extends GsVertex {

        graphic = new GsGraphic();
        hasRadius = true;
        build = true;

        constructor() {
            super();
        }

        render() {
            if (this.build) {
                this.doBuild();
            }
    
            this.graphic.render();
        }

        doBuild() {
            var slices = 32;
            var stacks = 32;

            // Setup temporary transformation matrix to place the spheres
            gc.pushTransform();
    
            var vertexIndex;
            var colorIndex;
            var radiusIndex;
            for (vertexIndex = 0, colorIndex = 0, radiusIndex = 0;
                vertexIndex < this.vertexData.length;
                vertexIndex += 3, colorIndex += 4, radiusIndex++) {	
                var radius = this.radiusData[radiusIndex];
        
                var x = this.vertexData[vertexIndex + 0];
                var y = this.vertexData[vertexIndex + 1];
                var z = this.vertexData[vertexIndex + 2];
        
                var p0 = [];
                var p1 = [];
                var p2 = [];
                var i, j;
        
                var stackAngle;
                var stackAngleInc = Math.PI / stacks;
                var sliceAngle;
                var sliceAngleInc = Math.PI / slices;
                var sliceRadius1;
                var sliceRadius2;
        
                var vT = [];
        
                this.graphic.color(this.colorData[colorIndex + 0], this.colorData[colorIndex + 1], this.colorData[colorIndex + 2], this.colorData[colorIndex + 3]);

                // Start with identity
                gc.modelview.identity();

                // Translate
                gc.modelview.translate(x, y, z);
        
                this.graphic.triangles();

                //
                // Create the top triangle fan.
                //

                sliceAngle = 0.0;
                stackAngle = stackAngleInc;
                sliceRadius2 = radius * Math.sin(stackAngle);

                sliceAngle = Math.PI;

                p0[0] = sliceRadius2 * Math.sin(sliceAngle);
                p0[1] = sliceRadius2 * Math.cos(sliceAngle);
                p0[2] = radius * Math.cos(stackAngle);

                sliceAngle -= sliceAngleInc * 2.0;

                for (j = 0; j <= slices; j++) {

                    p1[0] = sliceRadius2 * Math.sin(sliceAngle);
                    p1[1] = sliceRadius2 * Math.cos(sliceAngle);
                    p1[2] = radius * Math.cos(stackAngle);


                    this.mapVertex(0.0, 0.0, radius, vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);

                    this.mapVertex(p0[0], p0[1], p0[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);

                    this.mapVertex(p1[0], p1[1], p1[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);

                    p0[0] = p1[0];
                    p0[1] = p1[1];
                    p0[2] = p1[2];

                    sliceAngle -= sliceAngleInc * 2.0;
                }

                //
                // Create the middle triangle strips.
                //
        
                var stackAngle1;
                var stackAngle2 = stackAngle;

                for (i = 1; i < stacks - 1; i++) {

                    stackAngle1 = stackAngle2;
                    stackAngle2 += stackAngleInc;
                    sliceRadius1 = sliceRadius2;
                    sliceRadius2 = radius * Math.sin(stackAngle2);

                    sliceAngle = Math.PI;

                    p1[0] = sliceRadius2 * Math.sin(sliceAngle);
                    p1[1] = sliceRadius2 * Math.cos(sliceAngle);
                    p1[2] = radius * Math.cos(stackAngle2);

                    p0[0] = sliceRadius1 * Math.sin(sliceAngle);
                    p0[1] = sliceRadius1 * Math.cos(sliceAngle);
                    p0[2] = radius * Math.cos(stackAngle1);

                    for (j = 0; j < slices + 1; j++) {

                        sliceAngle += sliceAngleInc * 2.0;

                        p2[0] = sliceRadius1 * Math.sin(sliceAngle);
                        p2[1] = sliceRadius1 * Math.cos(sliceAngle);
                        p2[2] = radius * Math.cos(stackAngle1);

                        this.mapVertex(p0[0], p0[1], p0[2], vT);
                        this.graphic.vertex(vT[0], vT[1], vT[2]);

                        this.mapVertex(p2[0], p2[1], p2[2], vT);
                        this.graphic.vertex(vT[0], vT[1], vT[2]);

                        this.mapVertex(p1[0], p1[1], p1[2], vT);
                        this.graphic.vertex(vT[0], vT[1], vT[2]);

                        p0[0] = p1[0];
                        p0[1] = p1[1];
                        p0[2] = p1[2];

                        p1[0] = p2[0];
                        p1[1] = p2[1];
                        p1[2] = p2[2];

                        p2[0] = sliceRadius2 * Math.sin(sliceAngle);
                        p2[1] = sliceRadius2 * Math.cos(sliceAngle);
                        p2[2] = radius * Math.cos(stackAngle2);

                        this.mapVertex(p0[0], p0[1], p0[2], vT);
                        this.graphic.vertex(vT[0], vT[1], vT[2]);

                        this.mapVertex(p1[0], p1[1], p1[2], vT);
                        this.graphic.vertex(vT[0], vT[1], vT[2]);

                        this.mapVertex(p2[0], p2[1], p2[2], vT);
                        this.graphic.vertex(vT[0], vT[1], vT[2]);

                        p0[0] = p1[0];
                        p0[1] = p1[1];
                        p0[2] = p1[2];

                        p1[0] = p2[0];
                        p1[1] = p2[1];
                        p1[2] = p2[2];
                    }

                    stackAngle += stackAngleInc * 2.0;
                }

                //
                // Create the bottom triangle fan.
                //

                stackAngle = Math.PI - stackAngleInc;
                sliceRadius1 = radius * Math.sin(stackAngle);

                p0[0] = sliceRadius1 * Math.sin(sliceAngle);
                p0[1] = sliceRadius1 * Math.cos(sliceAngle);
                p0[2] = radius * Math.cos(stackAngle);

                sliceAngle += sliceAngleInc * 2.0;

                for (j = 0; j <= slices; j++) {

                    p1[0] = sliceRadius1 * Math.sin(sliceAngle);
                    p1[1] = sliceRadius1 * Math.cos(sliceAngle);
                    p1[2] = radius * Math.cos(stackAngle);

                    this.mapVertex(0.0, 0.0, -radius, vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);

                    this.mapVertex(p0[0], p0[1], p0[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);

                    this.mapVertex(p1[0], p1[1], p1[2], vT);
                    this.graphic.vertex(vT[0], vT[1], vT[2]);

                    p0[0] = p1[0];
                    p0[1] = p1[1];
                    p0[2] = p1[2];

                    sliceAngle += sliceAngleInc * 2.0;
                }
            }

            // Restore matrix
            gc.popTransform();

            this.build = false;
        }
    }
}