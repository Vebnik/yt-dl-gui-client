import {makeAutoObservable} from "mobx";

class GlobalStore {

	user = {
		savePath: ''
	}

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user) {
		this.user = user
	}

	setDefPath(path) {
		this.user.path = path
	}
}

export default GlobalStore