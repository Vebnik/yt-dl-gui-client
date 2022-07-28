import { dialog, app, BrowserWindow } from 'electron'
import {Model} from "sequelize";
const DataModel = require("../database/dataModel");
import * as child_process from "child_process";


class UserApi {

	async savePath(): Promise<object> {
		const prom: Promise<object> = new Promise(resolve => {

			try {
				dialog.showOpenDialog({title: 'save path', properties: ['openDirectory']})
					.then(async value => {

						const User = await DataModel.getUserModel()
						const user = await User.findOne({where: {id: 1}})

						if (user) {
							await user.update({savePath: value.filePaths[0]})
						}

						await User.create({savePath: value.filePaths[0]})
						await User.sync({alter: true})

						resolve({ok: true, message: value.filePaths, meta: value})
					})
			} catch (err) {
				resolve({ok: false, message: err})
			}
		})

		await Promise.all([prom])
		return prom
	}

	async openSavePath(): Promise<Object> {

		try {
			const User = await DataModel.getUserModel()
			const user = await User.findOne({where: {id: 1}})
			child_process.exec(`explorer ${user.dataValues.savePath}`)

			return {ok: true, message: 'Open dir'}
		} catch (err) {
			return {ok: false, message: err}
		}

	}

	async getUserConfig(): Promise<object> {
		try {

			const User = await DataModel.getUserModel()
			const config = await User.findAll()

			if (config.length)
				return config[0]

			return {
				savePath: 'no deffer savePath'
			}

		} catch (err) {
			console.error(err)
		}
	}

	async childProcExec(args: string): Promise<void> {
		child_process.exec(args)
	}

	async windowDrive(driveType: string) {
		const win = BrowserWindow.getFocusedWindow()

		switch (driveType) {
			case 'minimize': win.minimize()
				break
			case 'maximize': win.maximize()
				break
			case 'close': win.close()
				break
		}
	}
}

export default new UserApi()