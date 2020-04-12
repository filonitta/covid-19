import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import api from '@/services/api.class';
import CountriesList from '@shared/CountriesList';
import SearchField from '@shared/SearchField';
import Statistics from './Statistics';
// import NoData from '@shared/NoData';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const Today = () => {
	const [countries, setCountries] = useState([]);
	const [originalCountriesList, setOriginalCountriesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [searchValue] = useState('');

	useEffect(() => {
		async function fetchInfo() {
			setIsLoading(true);
			let countries = await api.getTodayInfo();

			// countries = countries.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0);
			countries = countries.sort((a, b) => b.cases - a.cases);

			setCountries(countries);
			setOriginalCountriesList(countries);
			setIsLoading(false);
		}

		fetchInfo();
	}, []);

	const updateList = (list, searchValue) => {
		setCountries(list);
	}

	if (isLoading) return <Spinner className="loader" animation="border" variant="primary" />;

	return (
		<>
			<div className="row">
				<div className="col-md-4">
					<div className="card">
						<div className="card-header text-white bg-secondary">
							Countries
						</div>
						<div className="card-body">
							<SearchField value={searchValue} list={originalCountriesList} onSearch={updateList} />
							<CountriesList
								list={countries}
								onListUpdate={setCountries}
								onCountrySelect={setSelectedCountry}
							/>
						</div>
					</div>
				</div>
				<div className="col-md-8">
					<div className="mt-4 mt-md-0">
					{!selectedCountry &&
						<div className="card card-body bg-light"><em>Select a country to see its data</em></div>
					}
					{selectedCountry && <Statistics info={selectedCountry} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default Today;