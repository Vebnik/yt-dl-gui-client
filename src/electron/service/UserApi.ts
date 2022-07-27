import { dialog } from 'electron'
import {Model} from "sequelize";
const DataModel = require("../database/dataModel");


class UserApi {

	async savePath(): Promise<object> {
		const prom: Promise<object> = new Promise(resolve => {

			try {
				dialog.showOpenDialog({title: 'save path', properties: ['openDirectory']})
					.then(async value => {

						const User = await DataModel.getUserModel()
						const user = await User.findOne({where: {id: 1}})
						await user.update({
							savePath: value.filePaths[0]
						})
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

}

export default new UserApi()