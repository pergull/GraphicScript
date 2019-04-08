module GraphicScript {

    export class BoundBox {

        min = new Vector();
        max = new Vector();

        constructor() {
            this.clear();
        }

        clear() {
            this.min.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
            this.max.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        }
    }
}