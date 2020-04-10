import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

import api from '@/services/api.class';
import Statistics from './Statistics';
import Context from '@redux/store';
import { allListAction } from '@redux/actions';
import { arraysEqual } from '@utils/array';

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

	// const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const data = await api.getCountries(360);
			
			data.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0).forEach(item => {
				item.country = item.country.capitalize();
				if (item.province) {
					item.province = item.province.capitalize();
				}
			});
			
			// setCountries(data);
			// !arraysEqual(data, countries) &&
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