class MainApiRoute {

	async searchVideo(url) {
		return await window.YTApi.search({ url })
	}

	async downloadVideo(url) {
		return await window.YTApi.download(url)
	}

	async getHistory() {
		return await window.YTApi.getHistory()
	}

	async savePath() {
		return await window.UserApi.savePath()
	}

	async openSavePath() {
		return await window.UserApi.openSavePath()
	}

	async getUserConfig() {
		return await window.UserApi.getUserConfig()
	}

	async childProcExec(args) {
		return await window.UserApi.childProcExec(args)
	}

	async windowDrive(driveType) {
		return await window.UserApi.windowDrive(driveType)
	}
}

export default new MainApiRoute()