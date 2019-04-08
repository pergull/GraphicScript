# GraphicScript
WebGL Graphics with TypeScript and Visual Studio Code

To get started, you should install Visual Studio Code from:

    https://code.visualstudio.com/

Since GraphicScript uses TypeScript, you will need to install Visual Studio Code TypeScript support.
Instructions to add TypeScript support to Visual Studio Code can be found at:

    https://code.visualstudio.com/docs/typescript/typescript-compiling

Next open the GraphicScript folder with Visual Studio Code.  The GraphicScript folder is configured
to build all the TypeScript code by issuing a build command.  It is best to understand the build
configuration files by examining the following files:

    - GraphicScript/tsconfig.json          => TypeScript files to compile
    - GraphicScript/.vscode/settings.json  => Files to hide in Visual Studio Code
    - GraphicScript/.vscode/tasks.json     => Build tasks

To explore GraphicScript in action, open "index.html" - located in the CodeBase folder

Documentation with examples are located in CodeBase/Documentation

Run examples are located in CodeBase/Run

The supporting source code is located in CodeBase/Source

To create your own GraphicScript program, clone a Run example. For example, clone:

    CodeBase/Run/HelloWorld

and then rename all "HelloWorld" references to "MyGraphicScriptProgram".

Good luck and hope this tool can grow with your ideas and help to make creating graphics simple and fun.
