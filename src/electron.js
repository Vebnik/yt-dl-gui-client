"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require('path');
var apiHandlers_1 = require("./electron/apiBridge/apiHandlers");
var startElectron = function () {
    var createWindow = function () {
        var winOptions = {
            width: 1200,
            height: 760,
            minWidth: 600,
            minHeight: 600,
            webPreferences: {
                devTools: true,
                contextIsolation: true,
                preload: path.join(__dirname, 'electron', 'apiBridge', 'preload.js'),
                webSecurity: false
            },
            titleBarOverlay: false,
            autoHideMenuBar: true,
            titleBarStyle: 'hidden'
        };
        new electron_1.BrowserWindow(winOptions)
            .loadURL('http://localhost:3000').catch(function (err) { return console.error(err); });
        //.loadFile(path.join('index.html'))
    };
    electron_1.app.on('ready', function () { return createWindow(); });
    electron_1.app.once('ready', function () { apiHandlers_1.default.ytApiHandlers(); apiHandlers_1.default.userApiHandlers(); });
    electron_1.app.on('window-all-closed', function () { return electron_1.app.quit(); });
};
startElectron();
