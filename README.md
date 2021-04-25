# helloworld README

This is the README for your extension "helloworld". After writing up a brief description, we recommend including the following sections.

## Features

Planned features is to list out all assigned JIRA issues and whne you click on them the system will automatically make or switch to a feature branch and stop current harvest timer and start a new one.
The feature branch will be named with the JIRA ticket as per new convenstions and so will all commits automatically

## Requirements

Currently requires a whole bunch of settings in ENV..  see in extension.js

## Extension Settings

N/A

## Known Issues

- Cannot get async API calls to work crsoss modules, tis causes a mess and not clean code. Why why why. WIN!
    Now we have to get jira issues from within the TreeDataProvider... bad
- Authentications needs to get done properly, now it is hardcoded with my user
- Authentication for JIRA needs to be properly base64'd, now its just using the proper postman one

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
# helloworld
