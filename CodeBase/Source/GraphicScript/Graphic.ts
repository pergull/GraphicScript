class Graphic {

    private gsGraphic: GraphicScript.GsGraphic;

    constructor() {
        this.gsGraphic = new GraphicScript.GsGraphic();
    }

    static make(): Graphic {
        return new Graphic();
    }

    static draw(graphic: Graphic): void {
        graphic.gsGraphic.render();
    }

    static viewDirection(x: number, y: number, z: number): void {
        gc.camera.setViewDirection(x, y, z);
        gc.hasViewDirection = true;
    }

    static viewUp(x: number, y: number, z: number): void {
        gc.camera.setUpVector(x, y, z);
        gc.hasViewUp = true;
    }

    static translate(x: number, y: number, z: number): void {
        gc.modelview.translate(x, y, z);
        gc.calcBoundBox = true;
    }

    static scale(x: number, y: number, z: number): void {
        gc.modelview.scale(x, y, z);
        gc.calcBoundBox = true;
    }

    static rotate(angle: number, x: number, y: number, z: number): void {
        gc.modelview.rotate(angle, x, y, z);
        gc.calcBoundBox = true;
    }

    static pushTransform(): void {
        gc.pushTransform();
        gc.calcBoundBox = true;
    }

    static popTransform(): void {
        gc.popTransform();
        gc.calcBoundBox = true;
    }

    static time() {
        return gc.currentTime;
    }

    static background(r: number, g: number, b: number) {
        gc.setBackground(r, g, b);
    }

    static boundingBox(enable: boolean) {
        gc.displayBoundingBox = enable;
    }

    color(r: number, g: number, b: number) {
        this.gsGraphic.color(r, g, b, 1);
    }

    vertex(x: number, y: number, z?: number) {
        if (z !== undefined) {
            gc.dimensions = GraphicScript.Dimensions.Three;
            this.gsGraphic.vertex(x, y, z);
            gc.calcBoundBox = true;
        } else {
            this.gsGraphic.vertex(x, y, 0);
        }
    }

    lines() {
        this.gsGraphic.lines();
    }

    lineStrip() {
        this.gsGraphic.lineStrip();
    }

    triangles() {
        this.gsGraphic.triangles();
    }

    triangleStrip() {
        this.gsGraphic.triangleStrip();
    }

    triangleFan() {
        this.gsGraphic.triangleFan();
    }

    spheres() {
        this.gsGraphic.spheres();
    }

    cuboids() {
        this.gsGraphic.cuboids();
    }

    cylinders() {
        this.gsGraphic.cylinders();
    }

    text(str: string) {
        this.gsGraphic.text(str.toString());
    }

    textSize(size: number) {
        this.gsGraphic.textSize(size);
    }

    radius(r: number) {
        this.gsGraphic.radius(r);
    }

    clear() {
        this.gsGraphic.clear();
    }
}