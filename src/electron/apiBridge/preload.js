"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('YTApi', {
    search: function (args) { return electron_1.ipcRenderer.invoke('search', args); },
    download: function (args) { return electron_1.ipcRenderer.invoke('download', args); },
    getHistory: function (args) { return electron_1.ipcRenderer.invoke('getHistory', args); },
    getDownload: function (args) { return electron_1.ipcRenderer.on('getCurrentDownload', args); },
});
electron_1.contextBridge.exposeInMainWorld('UserApi', {
    savePath: function (args) { return electron_1.ipcRenderer.invoke('savePath', args); },
    openSavePath: function (args) { return electron_1.ipcRenderer.invoke('openSavePath', args); },
    getUserConfig: function (args) { return electron_1.ipcRenderer.invoke('getUserConfig', args); },
    childProcExec: function (args) { return electron_1.ipcRenderer.invoke('childProcExec', args); },
    windowDrive: function (args) { return electron_1.ipcRenderer.invoke('windowDrive', args); },
    deleteItem: function (args) { return electron_1.ipcRenderer.invoke('deleteItem', args); },
});
