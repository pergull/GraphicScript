var gc: GraphicScript.GraphicContext;

class RunScript {
    
    gc: GraphicScript.GraphicContext;
    gl: WebGLRenderingContext;

    constructor() {
        this.startGraphicScript();
    }
    
    // override
    graphicDisplay() {}

    run() {
        gc.graphicScript = this;
    }

    startGraphicScript() {

        // Create GraphicContext
        gc = new GraphicScript.GraphicContext();
        this.gc = gc;
        this.gl = gc.gl;
    
        // Initialize GraphicContext
        gc.init();
    }
}