var applescript = require('applescript');


function openTerminalTab(filePath) {
    var dir = path.dirname(filePath);
    var script = '' +
        '\n tell application "Terminal"' +
        '\n   activate' +
        '\n   my makeTab()' +
        '\n   do script "cd ' + filePath + '" in front window' +
        '\n end tell' +
        '\n ' +
        '\n on makeTab()' +
        '\n   tell application "System Events" to keystroke "t" using {command down}' +
        '\n   delay 0.2' +
        '\n end makeTab';

    applescript.execString(script, function(err, rtn) {
    });
}

function open(e) {
    if (e.target && e.target.dataset && e.target.dataset.path) {
        //tree view
        openTerminalTab(e.target.dataset.path)
    }
    else {
        //command palette
        var editor = atom.workspace.getActivePaneItem();

        //open currently opened file
        if (editor && editor.buffer && editor.buffer.file) {
            var file = editor.buffer.file;
            if (file.path) {
                openTerminalTab(file.path)
            }
        }
        else {
            //open project root
            var projectPath = atom.project.getPaths()[0];
            if (projectPath) {
                openTerminalTab(projectPath);
            }
        }
    }
}

function activate() {
    atom.commands.add('atom-workspace', 'atom-mac-terminal:open', open);
}

module.exports = {
    activate: activate,
    open: open
}
