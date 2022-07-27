"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('YTApi', {
    search: function (args) { return electron_1.ipcRenderer.invoke('search', args); },
    download: function (args) { return electron_1.ipcRenderer.invoke('download', args); }
});
electron_1.contextBridge.exposeInMainWorld('UserApi', {
    savePath: function (args) { return electron_1.ipcRenderer.invoke('savePath', args); },
});
