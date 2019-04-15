var gc;
var RunScript = /** @class */ (function () {
    function RunScript() {
        this.startGraphicScript();
    }
    // override
    RunScript.prototype.graphicDisplay = function () { };
    RunScript.prototype.run = function () {
        gc.graphicScript = this;
    };
    RunScript.prototype.startGraphicScript = function () {
        // Create GraphicContext
        gc = new GraphicScript.GraphicContext();
        this.gc = gc;
        this.gl = gc.gl;
        // Initialize GraphicContext
        gc.init();
    };
    return RunScript;
}());
//# sourceMappingURL=RunScript.js.map