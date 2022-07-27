import {getInfo, downloadFromInfo} from 'ytdl-core'
import {downloadOption, ytVideoInfo} from "../namespace/ytModel";
import * as fs from "fs";
import * as path from "path";
const dayjs = require('dayjs')
const DataModel = require("../database/dataModel");


class YtApi {

	async getInfo(url: string): Promise<ytVideoInfo> {

		const prom: Promise<ytVideoInfo> = new Promise(resolve => {
			getInfo(url)
				.then(videoInfo => {

					resolve({
						url: videoInfo.videoDetails.video_url,
						title: videoInfo.videoDetails.title,
						duration: (+videoInfo.videoDetails.lengthSeconds/60).toFixed(2).toString(),
						thumbnail: videoInfo.videoDetails.thumbnails.at(-1).url,
						searchDate: dayjs().toString(),
						published: videoInfo.videoDetails.viewCount,
						author: videoInfo.videoDetails.author.name,
					})
				})
				// @ts-ignore
				.catch(err => resolve({ok: false, message: err}))
		})
		await Promise.all([prom])
		return prom
	}

	async download(option: downloadOption): Promise<Object> {

		const prom: Promise<Object> = new Promise(async resolve => {
			try {

				const User = await DataModel.getUserModel()
				const Video = await DataModel.getVideoModel()
				const config = await User.findAll()

				await getInfo(option.url).then(async videoInfo => {

					await Video.create({
						title: videoInfo.videoDetails.title,
						url: videoInfo.videoDetails.video_url,
						duration: videoInfo.videoDetails.lengthSeconds,
						savePath: config[0].dataValues.savePath,
						thumbnail: videoInfo.videoDetails.thumbnails.at(-1).url,
					})
					await Video.sync({alter: true})

					downloadFromInfo(videoInfo, {quality: option.filter})
						.pipe(fs.createWriteStream(path.join(config[0].dataValues.savePath,`${videoInfo.videoDetails.title}.mp4`)))
					resolve({ok: true, message: 'start download'})
				})

			} catch (err) {
				resolve({ok: false, message: err})
			}
		})

		await Promise.all([prom])
		return prom
	}

	async getHistory() {

		try {
			const Video = await DataModel.getVideoModel()
			const allVideo = await Video.findAll()

			return {ok: true, message: allVideo}
		} catch (err) {
			return {ok: false, message: err}
		}


	}

}

export default new YtApi()