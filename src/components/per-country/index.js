import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import api from '@/services/api.class';
import Statistics from './Statistics';

String.prototype.capitalize = function () {
	// const value = this.valueOf().split(' ');
	// return value.map(str => `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`).join(' ');
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalPerCountry = () => {
	const [countries, setCountries] = useState([]);
	const [originalCountriesList, setOriginalCountriesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);

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
			setOriginalCountriesList(countries);
			setIsLoading(false);
		}

		fetchCountries();
	}, []);

	return (
		<>
			<Statistics list={countries} />
		</>
	);
};

export default HistoricalPerCountry;