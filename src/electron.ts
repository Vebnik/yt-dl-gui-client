import {app, BrowserWindow } from 'electron'
const path = require('path')
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;
import ApiHandlers from "./electron/apiBridge/apiHandlers";


const startElectron = () => {

	const createWindow = () => {

		const winOptions: BrowserWindowConstructorOptions  = {
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
		}

		new BrowserWindow(winOptions)
			//.loadURL('http://localhost:3000').catch(err => console.error(err))
			.loadFile(path.join('index.html'))

	}


	app.on('ready', () => createWindow())
	app.once('ready', () => {ApiHandlers.ytApiHandlers(); ApiHandlers.userApiHandlers()})
	app.on('window-all-closed', () => app.quit())

};startElectron()