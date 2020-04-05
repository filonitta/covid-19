import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import api from '@/services/api.class';
import Statistics from './Statistics';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalCountries = () => {
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const countries = await api.getCountries();
			
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
		<>{isLoading ? <Spinner className="loader" animation="border" variant="primary" /> : <Statistics list={countries} /> }</>
	);
};

export default HistoricalCountries;