import { dialog } from 'electron'

class UserApi {

	async savePath(): Promise<object> {
		const prom: Promise<object> = new Promise(resolve => {

			try {
				dialog.showOpenDialog({title: 'save path', properties: ['openDirectory']})
					.then(value => resolve({ok: true, message: value.filePaths, meta: value}))
			} catch (err) {
				resolve({ok: false, message: err})
			}
		})

		await Promise.all([prom])
		return prom
	}

}

export default new UserApi()