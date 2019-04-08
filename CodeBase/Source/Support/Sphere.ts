module GraphicScript {

    export class Sphere {

        center: Vector = new Vector();
        radius: number;

        constructor() {
            this.clear();
        }

        clear() {
            this.center.set(0, 0, 0);
            this.radius = -1;
        }

        copy(sphere: Sphere) {
            this.center.copy(sphere.center);
            this.radius = sphere.radius;
        }
    }
}