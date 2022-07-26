import {app, BrowserWindow } from 'electron'
const path = require('path')
import BrowserWindowConstructorOptions = Electron.BrowserWindowConstructorOptions;


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
				preload: path.join(__dirname, 'electron', 'preload.js')
			},
			titleBarOverlay: false,
			autoHideMenuBar: true,
			titleBarStyle: 'hidden'
		}

		new BrowserWindow(winOptions)
			.loadURL('http://localhost:3000').catch(err => console.error(err))

	}


	app.on('ready', () => createWindow())
	app.on('window-all-closed', () => app.quit())

};startElectron()