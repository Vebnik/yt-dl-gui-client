import { contextBridge, ipcRenderer } from 'electron'
import {ytSearch} from "../namespace/ytModel";

contextBridge.exposeInMainWorld('YTApi', {
	search: (args: ytSearch) => ipcRenderer.invoke('search', args),
	download: (args: ytSearch) => ipcRenderer.invoke('download', args)
})

contextBridge.exposeInMainWorld('UserApi', {
	savePath: (args: any) => ipcRenderer.invoke('savePath', args),
	getUserConfig: (args: any) => ipcRenderer.invoke('getUserConfig', args),
})