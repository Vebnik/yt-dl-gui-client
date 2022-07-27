class MainApiRoute {

	async searchVideo(url) {
		return await window.YTApi.search({ url })
	}

	async downloadVideo(url) {
		return await window.YTApi.download({ url })
	}

	async savePath() {
		return await window.UserApi.savePath()
	}

	async getUserConfig() {
		return await window.UserApi.getUserConfig()
	}
}

export default new MainApiRoute()