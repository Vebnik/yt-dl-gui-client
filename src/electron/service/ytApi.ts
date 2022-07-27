import {getInfo, downloadFromInfo} from 'ytdl-core'
import { dialog } from 'electron'
import {ytVideoInfo} from "../namespace/ytModel";
import * as fs from "fs";
import * as path from "path";


class YtApi {

	async getInfo(url: string): Promise<ytVideoInfo> {

		const prom: Promise<ytVideoInfo> = new Promise(resolve => {
			getInfo(url).then(videoInfo => {
				resolve({
					url: videoInfo.videoDetails.video_url,
					title: videoInfo.videoDetails.title,
					duration: (+videoInfo.videoDetails.lengthSeconds/60).toFixed(2).toString(),
					thumbnail: videoInfo.videoDetails.thumbnails[0].url,
					searchDate: new Date().toISOString()
				})
			})
		})
		await Promise.all([prom])
		return prom
	}

	async download(url: string): Promise<Object> {

		const prom: Promise<Object> = new Promise(resolve => {
			try {
				getInfo(url).then(videoInfo => {
					dialog.showSaveDialog({properties: ['showHiddenFiles', 'createDirectory']}).then(value => {

						downloadFromInfo(videoInfo, {filter: 'videoandaudio', quality: 'highest'})
							.pipe(fs.createWriteStream(path.join(`${value.filePath}.mp4`)))
					})
					resolve({ok: true, message: 'start download'})
				})
			} catch (err) {
				resolve({ok: false, message: err})
			}
		})

		await Promise.all([prom])
		return prom
	}

}

export default new YtApi()