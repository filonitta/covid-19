const storage = {
	get(key) {
		try {
			return JSON.parse(window.localStorage.getItem(key));
		} catch (e) {
			return window.localStorage.getItem(key);
		}
	},

	set(key, value) {
		let result;

		switch (value.constructor) {
			case Object:
			case Array: result = window.localStorage.setItem(key, JSON.stringify(value)); break;
			default: result = window.localStorage.setItem(key, value);
		}

		return result;
	},

	remove(key) {
		return window.localStorage.removeItem(key);
	},

	clear() {
		return window.localStorage.clear();
	}
};

export default storage;