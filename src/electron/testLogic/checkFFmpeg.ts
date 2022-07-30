import * as cp from 'child_process'


const checkFFmpeg = async () => {
	const check = new Promise(async (resolve, reject) => {

		await cp.spawn('ffmpeg').on('error', (err) => {
			if (err) reject(err)
		})

		resolve(true)
	})

	await Promise.all([check])
	return check
}; checkFFmpeg().then(res => console.error(res))

