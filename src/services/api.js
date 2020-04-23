import React, { useState, useEffect, useReducer, useCallback } from 'react';

import { ENV } from '@env';
// import REST from './rest.class.js';
import useFetch from '@/services/fetch';

const useApi = () => {
	const [server] = useState(ENV.api);

	const getCountries = (count = 30) => {
		/* const {
			data,
			isLoading,
			isError,
			errorMessage,
			updateDataRecord
		} = useFetch(`${server}/historical?lastdays=${count}`, []);
		console.log(data, isLoading)
		return data; */
	}
	
	const getTotalInfo = () => {
		// const {
		// 	data,
		// 	isLoading,
		// 	isError,
		// 	errorMessage,
		// } = useFetch(`${server}/all`, {});
		// console.log(data, isLoading, isError, errorMessage);
		
		// return data;
	};
	
	const getTodayInfo = () => {
		// return this.getQuery('countries');
	}

	const getTodayCountryInfo = (countryName) => {
		// return this.getQuery(`countries/${countryName}`);
	}

	return {
		getCountries,
		getTotalInfo,
		getTodayInfo,
		getTodayCountryInfo
	}
}

// const api = API(`${}`);

export default useApi;
