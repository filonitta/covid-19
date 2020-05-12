import React, { useState, useEffect, useReducer } from 'react';

/**
 * https://app.pluralsight.com/course-player?clipId=699472b7-c99c-46ad-a941-24dc8b026de5
 */

const dataFetchReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_INIT': return {
			...state,
			isLoading: true,
			isError: false
		};
		case 'FETCH_SUCCESS': return {
			...state,
			isLoading: false,
			isError: false,
			errorMessage: '',
			data: action.payload
		};
		case 'FETCH_FAILURE': return {
			...state,
			isLoading: false,
			isError: true,
			errorMessage: 'Data Retrieve Failure',
		};
		case 'REPLACE_DATA': {
			const newData = state.data.map(record => record.id === action.replacerecord.id ? action.replacerecord : record);

			return {
				...state,
				isLoading: false,
				isError: false,
				errorMessage: '',
				data: newData
			};
		}
		default: throw new Error();
	}
};

const useFetch = (url, initialData) => {
	// const [url] = useState(initialUrl);

	const [state, dispatch] = useReducer(dataFetchReducer, {
		isLoading: false,
		isError: false,
		errorMessage: '',
		data: initialData
	});

	useEffect(() => {
		let didCancel = false;

		const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT' });
			try {
				const result = await fetch(url).then(_ => _.json());

				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS', payload: result });
				}
			} catch (error) {
				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILURE' });
				}
			}
		}	

		fetchData();

		return () => {
			didCancel = true;
		};
	}, [url]);

	const updateDataRecord = record => {
		dispatch({ type: 'REPLACE_DATA', replacerecord: record });
	};

	return { ...state, updateDataRecord };
};

export default useFetch;