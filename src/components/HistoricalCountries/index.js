import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

import api from '@/services/api.class';
import Statistics from './Statistics';
import Context from '@redux/store';
import { allListAction } from '@redux/actions';
import { aggregateByCountryName } from '@utils/countries';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalCountries = () => {
	const { store, dispatch } = useContext(Context);
	const {
		all: {
			list: countries,
		}
	} = store;

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			let data = await api.getCountries(360);
			
			data = aggregateByCountryName(data);
			
			dispatch( allListAction(data) );
			setIsLoading(false);
		}

		fetchCountries();
	}, [dispatch]);

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