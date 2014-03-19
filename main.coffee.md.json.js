window["distri/xhr:main.coffee.md"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "xhr\n===\n\nSuper small xhr helper library.\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.0\"\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "XHR\n===\n\nExample\n\n>     #! demo\n>     Request\n>       url: \"https://api.github.com/gists\"\n>       complete: OUT\n\n    module.exports = ({url, data, method, success, error, complete}) ->\n      method ?= \"GET\"\n      data ?= {}\n\n      xhr = new XMLHttpRequest\n      attachListeners(xhr)\n      xhr.open(method, url, true)\n\n      if method is \"POST\"\n        data = Object.keys(data).reduce (formData, key) ->\n          formData.append(key, data[key])\n\n          return formData\n        , new FormData\n\n      xhr.send data\n\n      return xhr\n\n    attachListeners = (xhr, success, error, progress) ->\n      if progress\n        xhr.addEventListener \"progress\", (event) ->\n          if event.loaded?\n            progress(event.loaded / event.total)\n          else\n            progress()\n\n      if success\n        xhr.addEventListener \"load\", ->\n          success xhr.response\n\n      if error\n        xhr.addEventListener \"error\", ->\n          error xhr\n\n        xhr.addEventListener \"abort\", ->\n          error xhr\n\n      return xhr\n\nLive Examples\n-------------\n\n>     #! setup\n>     require(\"/interactive_runtime\")\n",
      "type": "blob"
    },
    "interactive_docs.coffee.md": {
      "path": "interactive_docs.coffee.md",
      "mode": "100644",
      "content": "",
      "type": "blob"
    },
    "lib/util.coffee.md": {
      "path": "lib/util.coffee.md",
      "mode": "100644",
      "content": "Utility Functions\n-----------------\n\n    module.exports =\n\nEvaluate a program with a given environment object.\n\nThe values of the environment are mapped to local variables with names equal to\nthe keys.\n\nThe given program is then run with that environment and optionally a context for\n`this`.\n\n      executeWithContext: (program, environment, context) ->\n        args = Object.keys(environment)\n\n        values = args.map (name) ->\n          environment[name]\n\n        Function(args..., program).apply(context, values)\n",
      "type": "blob"
    },
    "interactive_runtime.coffee.md": {
      "path": "interactive_runtime.coffee.md",
      "mode": "100644",
      "content": "Interactive Runtime\n===================\n\nRegister our interactive documentation runtime components.\n\nThese requires set up our interactive documentation environment.\n\n    {executeWithContext} = require(\"/util\")\n\n`demo` runs the example code when you press the run button.\n\n    Interactive.register \"demo\", ({source, runtimeElement}) ->\n      # HACK: using the element to hold our state\n      runtimeElement.program = CoffeeScript.compile(source)\n\n      # Init\n      if runtimeElement.is(\":empty\")\n        runButton = $ \"<button>\",\n          text: \"Run\"\n          css:\n            position: \"absolute\"\n            marginTop: \"-2.5em\"\n            marginLeft: \"-1.5em\"\n          click: ->\n            outputElement.textContent = \"\"\n\n            executeProgram runtimeElement.program, outputElement\n\n        outputElement = document.createElement \"pre\"\n\n        runtimeElement\n          .append(runButton)\n          .append(outputElement)\n\nHelpers\n-------\n\nExecute a program attaching it's output to the output element.\n\n    executeProgram = (program, outputElement) ->\n      executeWithContext program,\n        OUT: (atom) ->\n          outputElement.textContent += \"#{atom}\\n\"\n",
      "type": "blob"
    }
  },
  "distribution": {
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.0\"};",
      "type": "blob"
    },
    "main": {
      "path": "main",
      "content": "(function() {\n  var attachListeners;\n\n  module.exports = function(_arg) {\n    var complete, data, error, method, success, url, xhr;\n    url = _arg.url, data = _arg.data, method = _arg.method, success = _arg.success, error = _arg.error, complete = _arg.complete;\n    if (method == null) {\n      method = \"GET\";\n    }\n    if (data == null) {\n      data = {};\n    }\n    xhr = new XMLHttpRequest;\n    attachListeners(xhr);\n    xhr.open(method, url, true);\n    if (method === \"POST\") {\n      data = Object.keys(data).reduce(function(formData, key) {\n        formData.append(key, data[key]);\n        return formData;\n      }, new FormData);\n    }\n    xhr.send(data);\n    return xhr;\n  };\n\n  attachListeners = function(xhr, success, error, progress) {\n    if (progress) {\n      xhr.addEventListener(\"progress\", function(event) {\n        if (event.loaded != null) {\n          return progress(event.loaded / event.total);\n        } else {\n          return progress();\n        }\n      });\n    }\n    if (success) {\n      xhr.addEventListener(\"load\", function() {\n        return success(xhr.response);\n      });\n    }\n    if (error) {\n      xhr.addEventListener(\"error\", function() {\n        return error(xhr);\n      });\n      xhr.addEventListener(\"abort\", function() {\n        return error(xhr);\n      });\n    }\n    return xhr;\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "interactive_docs": {
      "path": "interactive_docs",
      "content": "(function() {\n\n\n}).call(this);\n\n//# sourceURL=interactive_docs.coffee",
      "type": "blob"
    },
    "lib/util": {
      "path": "lib/util",
      "content": "(function() {\n  var __slice = [].slice;\n\n  module.exports = {\n    executeWithContext: function(program, environment, context) {\n      var args, values;\n      args = Object.keys(environment);\n      values = args.map(function(name) {\n        return environment[name];\n      });\n      return Function.apply(null, __slice.call(args).concat([program])).apply(context, values);\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=lib/util.coffee",
      "type": "blob"
    },
    "interactive_runtime": {
      "path": "interactive_runtime",
      "content": "(function() {\n  var executeProgram, executeWithContext;\n\n  executeWithContext = require(\"/util\").executeWithContext;\n\n  Interactive.register(\"demo\", function(_arg) {\n    var outputElement, runButton, runtimeElement, source;\n    source = _arg.source, runtimeElement = _arg.runtimeElement;\n    runtimeElement.program = CoffeeScript.compile(source);\n    if (runtimeElement.is(\":empty\")) {\n      runButton = $(\"<button>\", {\n        text: \"Run\",\n        css: {\n          position: \"absolute\",\n          marginTop: \"-2.5em\",\n          marginLeft: \"-1.5em\"\n        },\n        click: function() {\n          outputElement.textContent = \"\";\n          return executeProgram(runtimeElement.program, outputElement);\n        }\n      });\n      outputElement = document.createElement(\"pre\");\n      return runtimeElement.append(runButton).append(outputElement);\n    }\n  });\n\n  executeProgram = function(program, outputElement) {\n    return executeWithContext(program, {\n      OUT: function(atom) {\n        return outputElement.textContent += \"\" + atom + \"\\n\";\n      }\n    });\n  };\n\n}).call(this);\n\n//# sourceURL=interactive_runtime.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.0",
  "entryPoint": "main",
  "repository": {
    "id": 17921683,
    "name": "xhr",
    "full_name": "distri/xhr",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://avatars.githubusercontent.com/u/6005125?",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/xhr",
    "description": "Super small xhr helper library.",
    "fork": false,
    "url": "https://api.github.com/repos/distri/xhr",
    "forks_url": "https://api.github.com/repos/distri/xhr/forks",
    "keys_url": "https://api.github.com/repos/distri/xhr/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/xhr/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/xhr/teams",
    "hooks_url": "https://api.github.com/repos/distri/xhr/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/xhr/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/xhr/events",
    "assignees_url": "https://api.github.com/repos/distri/xhr/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/xhr/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/xhr/tags",
    "blobs_url": "https://api.github.com/repos/distri/xhr/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/xhr/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/xhr/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/xhr/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/xhr/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/xhr/languages",
    "stargazers_url": "https://api.github.com/repos/distri/xhr/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/xhr/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/xhr/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/xhr/subscription",
    "commits_url": "https://api.github.com/repos/distri/xhr/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/xhr/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/xhr/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/xhr/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/xhr/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/xhr/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/xhr/merges",
    "archive_url": "https://api.github.com/repos/distri/xhr/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/xhr/downloads",
    "issues_url": "https://api.github.com/repos/distri/xhr/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/xhr/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/xhr/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/xhr/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/xhr/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/xhr/releases{/id}",
    "created_at": "2014-03-19T21:50:32Z",
    "updated_at": "2014-03-19T21:50:32Z",
    "pushed_at": "2014-03-19T21:50:32Z",
    "git_url": "git://github.com/distri/xhr.git",
    "ssh_url": "git@github.com:distri/xhr.git",
    "clone_url": "https://github.com/distri/xhr.git",
    "svn_url": "https://github.com/distri/xhr",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://avatars.githubusercontent.com/u/6005125?",
      "gravatar_id": "192f3f168409e79c42107f081139d9f3",
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "main.coffee.md",
    "publishBranch": "gh-pages"
  },
  "dependencies": {}
});