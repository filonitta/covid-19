import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

import api from '@/services/api.class';
import Statistics from './Statistics';
// import { format } from '@utils/date';
// import Period from '@shared/Period';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalCountries = () => {
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [period, setPeriod] = useState(30);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const countries = await api.getCountries(360);
			
			countries.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0).forEach(item => {
				item.country = item.country.capitalize();
				if (item.province) {
					item.province = item.province.capitalize();
				}
			});
			
			setCountries(countries);
			setIsLoading(false);
		}

		fetchCountries();
	}, []);

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