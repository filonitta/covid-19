export default class REST {
	_errors = [];
	_error = null;
	resolveError = null;
	requests = [];

	constructor(server, headers) {
		this.server = server.trim();

		let defaultHeaders = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		this.headers = Object.assign(defaultHeaders, headers);
	}

	setHeaders(header, value) {
		this.headers[header] = value;
	}

	getQuery(method) {
		this.beforeRequest();

		let controller = new AbortController();
		this.requests.push({ controller });

		return fetch(`${this.server}/${method}`, {
			method: 'GET',
			signal: controller.signal,
			headers: this.headers
		})
		.then(this._handleErrors.bind(this))
		.then(result => result.json())
		.finally(() => {
			this.requests.pop();
			this.afterRequest();
		});
	}

	postQuery(method, data) {
		this.beforeRequest();

		let controller = new AbortController();
		this.requests.push({ controller });

		return fetch(`${this.server}/${method}`, {
			method: 'POST',
			signal: controller.signal,
			headers: this.headers,
			body: JSON.stringify(data)
		})
		.then(this._handleErrors.bind(this))
		.then(result => result.json())
		.finally(() => {
			this.requests.pop();
			this.afterRequest();
		});
	}

	putQuery(method, data) {
		this.beforeRequest();

		let controller = new AbortController();
		this.requests.push({ controller });

		return fetch(`${this.server}/${method}`, {
			method: 'PUT',
			signal: controller.signal,
			headers: this.headers,
			body: JSON.stringify(data)
		})
		.then(this._handleErrors.bind(this))
		.then(result => result.json())
		.finally(() => {
			this.requests.pop();
			this.afterRequest();
		});
	}

	deleteQuery(method) {
		this.beforeRequest();

		let controller = new AbortController();
		this.requests.push({ controller });

		return fetch(`${this.server}/${method}`, {
			method: 'DELETE',
			signal: controller.signal,
			headers: this.headers
		})
		.then(this._handleErrors.bind(this))
		.then(result => result.json())
		.finally(() => {
			this.requests.pop();
			this.afterRequest();
		});
	}

	responseError() {
		return new Promise(_ => this.resolveError = _);
	}

	/* method to override */
	beforeRequest() {}

	/* method to override */
	afterRequest() {}

	get signalAborted() {
		return !!this.requests.some(request => request.controller.signal.aborted);
	}

	abort() {
		this.requests.forEach(request => request.controller.abort());
		// this.requests = [];
	}

	_handleErrors(response) {
		this.requests.pop();

		if (!response.ok) {
			return response.json().then(error => {
				this.resolveError(response);
				return Promise.reject(error);
			});
		}

		return response;
	}
}
