XHR
===

Example

>     #! demo
>     Request
>       url: "https://api.github.com/gists"
>       complete: OUT

    module.exports = ({url, data, method, success, error, complete}) ->
      method ?= "GET"
      data ?= {}

      xhr = new XMLHttpRequest
      attachListeners(xhr)
      xhr.open(method, url, true)

      if method is "POST"
        data = Object.keys(data).reduce (formData, key) ->
          formData.append(key, data[key])

          return formData
        , new FormData

      xhr.send data

      return xhr

    attachListeners = (xhr, success, error, progress) ->
      if progress
        xhr.addEventListener "progress", (event) ->
          if event.loaded?
            progress(event.loaded / event.total)
          else
            progress()

      if success
        xhr.addEventListener "load", ->
          success xhr.response

      if error
        xhr.addEventListener "error", ->
          error xhr

        xhr.addEventListener "abort", ->
          error xhr

      return xhr

Live Examples
-------------

>     #! setup
>     require("/interactive_runtime")
