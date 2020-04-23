import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

import api from '@/services/api.class';
import Statistics from './Statistics';
import Context from '@redux/store';
import { allListAction } from '@redux/actions';
import { aggregateByCountryName } from '@utils/countries';
import ErorMessage from '@shared/ErorMessage';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalCountries = () => {
	const { store, dispatch } = useContext(Context);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		all: {
			list: countries,
		}
	} = store;

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			let data = await api.getCountries(0).catch(setErrorMessage);
			
			if (data) {
				data = aggregateByCountryName(data);
				dispatch( allListAction(data) );
			}
			
			setIsLoading(false);
		}

		fetchCountries();
	}, [dispatch]);

	if (errorMessage) return <ErorMessage />;

	return (
		<>
			{!countries.length ? <Spinner className="loader" animation="border" variant="primary" /> : (
				<div className="card card-body bg-light statistics">
					<Statistics list={countries} />
				</div>
			)}
		</>
	)
};

export default HistoricalCountries;