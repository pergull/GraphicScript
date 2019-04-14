module GraphicScript {

    export class Color {

        r: number;
        g: number;
        b: number;
        a: number;

        constructor(r = -1, g = -1, b = -1, a = 1) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }

        set(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }

        setDefault() {
            this.r = -1;
            this.g = -1;
            this.b = -1;
            this.a = 1;
        }
    }
}