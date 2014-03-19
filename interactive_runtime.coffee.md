Interactive Runtime
===================

Register our interactive documentation runtime components.

These requires set up our interactive documentation environment.

    {executeWithContext} = require("/util")

`demo` runs the example code when you press the run button.

    Interactive.register "demo", ({source, runtimeElement}) ->
      # HACK: using the element to hold our state
      runtimeElement.program = CoffeeScript.compile(source)

      # Init
      if runtimeElement.is(":empty")
        runButton = $ "<button>",
          text: "Run"
          css:
            position: "absolute"
            marginTop: "-2.5em"
            marginLeft: "-1.5em"
          click: ->
            outputElement.textContent = ""

            executeProgram runtimeElement.program, outputElement

        outputElement = document.createElement "pre"

        runtimeElement
          .append(runButton)
          .append(outputElement)

Helpers
-------

Execute a program attaching it's output to the output element.

    executeProgram = (program, outputElement) ->
      executeWithContext program,
        OUT: (atom) ->
          outputElement.textContent += "#{atom}\n"
