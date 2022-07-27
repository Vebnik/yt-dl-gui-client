import { ipcMain } from 'electron'
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {ytSearch} from "../namespace/ytModel";
import YtApi from "../service/ytApi";
import UserApi from "../service/UserApi";


class ApiHandlers{

	ytApiHandlers() {
		ipcMain.handle('search', async (event: IpcMainInvokeEvent, args: ytSearch) => {
			return await YtApi.getInfo(args.url)
		})

		ipcMain.handle('download', async (event: IpcMainInvokeEvent, args: ytSearch) => {
			return await YtApi.download(args.url)
		})
	}

	userApiHandlers() {
		ipcMain.handle('savePath', async (event: IpcMainInvokeEvent, args: any) => {
			return await UserApi.savePath()
		})

		ipcMain.handle('getUserConfig', async (event: IpcMainInvokeEvent, args: any) => {
			return await UserApi.getUserConfig()
		})
	}
}

export default new ApiHandlers()