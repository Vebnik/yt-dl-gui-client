import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('YTApi', {
		search: (args) => ipcRenderer.invoke('search', args)
})