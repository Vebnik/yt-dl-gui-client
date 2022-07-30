import {getInfo, downloadFromInfo, videoInfo} from 'ytdl-core'
import {downloadOption, ytVideoInfo} from "../namespace/ytModel"
import { BrowserWindow } from 'electron'
import * as fs from "fs"
import * as path from "path"
import * as cp from 'child_process'
const dayjs = require('dayjs')
const DataModel = require("../database/dataModel")


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

					if (option.filter === 'highest') {
						resolve(await this.streamDownload(videoInfo, config))
						return;
					}

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

	// Private

	private processDownload: Map<string, object> = new Map()

	private async streamDownload(videoInfo: videoInfo, config) {

		if (!(await this.checkFFmpeg()))
			return {ok: false, message: 'Not exist FFmpeg'}

		try {
			const downloadData = {
				audio: {downloaded: 0, total: 0},
				video: {downloaded: 0, total: 0},
			}

			const audio = await downloadFromInfo(videoInfo, {quality: 'highestaudio'})
				.on('progress', (_, downloaded, total) => {
					downloadData.audio = {downloaded, total}
				})

			const video = await downloadFromInfo(videoInfo, {quality: 'highestvideo'})
				.on('progress', (_, downloaded, total) => {
					downloadData.video = {downloaded, total}
				})

			const ffmpegMerge = await cp.spawn('ffmpeg', [
				'-loglevel', '8', '-hide_banner',
				'-progress', 'pipe:3',
				'-i', 'pipe:4',
				'-i', 'pipe:5',
				'-map', '0:a',
				'-map', '1:v',
				'-c:v', 'copy',
				path.join(config[0].dataValues.savePath,`${videoInfo.videoDetails.channelId}.mkv`),
			], {
				windowsHide: true,
				stdio: [
					'inherit', 'inherit', 'inherit',
					'pipe', 'pipe', 'pipe',
				]
			})

			ffmpegMerge.on('close', () => {
				this.processDownload.delete(videoInfo.videoDetails.video_url)

				if(!this.processDownload.size)
					BrowserWindow.getAllWindows()[0]
						.webContents.send('getCurrentDownload', [])

				console.log('done')
			})

			ffmpegMerge.stdio[3].on('data', (chunk) => {
				const linesArr = chunk.toString().trim().split('\n')
				const args = {}

				for (const info of linesArr){
					const [key, value] = info.split('=')
					args[key.trim()] = value
				}

				const totalPercent = {
					audio: (downloadData.audio.downloaded / (downloadData.audio.total/100)).toFixed(2),
					video: (downloadData.video.downloaded / (downloadData.video.total/100)).toFixed(2),
				}

				this.processDownload.set(videoInfo.videoDetails.video_url, {totalPercent, info: videoInfo.videoDetails})

				BrowserWindow.getAllWindows()[0]
					.webContents.send(
						'getCurrentDownload', Array.from(this.processDownload.values()))

			})

			audio.pipe(ffmpegMerge.stdio[4])
			video.pipe(ffmpegMerge.stdio[5])

			return {ok: true, message: 'Start download'}
		}
		catch (err) {
			return {ok: false, message: err}
		}

	}

	private async checkFFmpeg() {
		const check = new Promise(async (resolve) => {
			await cp.spawn('ffmpeg').on('error', (err) => resolve(false))
			setTimeout(() => resolve(true), 1000)
		})

		await Promise.all([check])
		return check
	}

}

export default new YtApi()