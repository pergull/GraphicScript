# GraphicScript Test
WebGL Graphics with TypeScript and Visual Studio Code

Live demo of documentation and examples can be explored at:

    https://pergull.github.io/GraphicScript/

To get started, you should install Visual Studio Code from:

    https://code.visualstudio.com/

Since GraphicScript uses TypeScript, you will need to install Visual Studio Code TypeScript support.
Instructions to add TypeScript support to Visual Studio Code can be found at:

    https://code.visualstudio.com/docs/typescript/typescript-compiling

Next open the GraphicScript folder with Visual Studio Code.  The GraphicScript folder is configured
to build all the TypeScript code by issuing a build command.  It is best to understand the build
configuration files by examining the following files:

    - GraphicScript/tsconfig.json      => TypeScript files to compile
    - GraphicScript/.vscode/tasks.json => Build tasks

To explore GraphicScript in action, open "index.html" - located in the docs folder

Documentation with examples are located in docs/Documentation

Run examples are located in docs/Run

The supporting source code is located in docs/Source

To create your own GraphicScript program, clone a Run example. For example, clone:

    docs/Run/HelloWorld

and then rename all "HelloWorld" references to "MyGraphicScriptProgram".

Good luck!
