/* eslint no-func-assign: "off" */

import { ENV } from '@env';
import REST from './rest.class.js';

class API extends REST {
	constructor(server) {
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		};

		super(server, headers);
	}

	setHeaders(header, value) {
		this.headers[header] = `Bearer ${value}`;
	}

	getCountries() {
		return this.getQuery('v2/historical');
	}
	
	getTotalInfo() {
		return this.getQuery('all');
	}
	
	getTodayInfo() {
		return this.getQuery('countries');
	}

	getTodayCountryInfo(countryName) {
		return this.getQuery(`countries/${countryName}`);
	}
}

const api = new API(`${ENV.api}`);

api.responseError().then((error) => {
	switch (error.status) {
		case 401:
			break;
	}
});

export default api;
