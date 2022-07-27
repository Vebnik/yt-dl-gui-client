import {makeAutoObservable} from "mobx";

class GlobalStore {

	user = {
		path: 'deffer path'
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