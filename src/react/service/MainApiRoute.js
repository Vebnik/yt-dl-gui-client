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
}

export default new MainApiRoute()