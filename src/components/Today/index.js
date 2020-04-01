import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import api from '@/services/api.class';
import CountriesList from '@shared/CountriesList';
import SearchField from '@shared/SearchField';
// import Sorting from './Sorting';
import Statistics from './Statistics';
import NoData from '@shared/NoData';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const Today = () => {
	const [countries, setCountries] = useState([]);
	const [originalCountriesList, setOriginalCountriesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);

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

	const updateList = (list) => {
		setCountries([...list]);
	}

	const getCountryInfo = async item => {
		const data = await api.getTodayCountryInfo(item.country);
		setSelectedCountry(data);
	}

	if (isLoading) return <NoData />;

	return (
		<>
			<div className="row">
				<div className="col-sm-4">
					<div className="card">
						<div className="card-header text-white bg-primary">
							Countries
						</div>
						<div className="card-body">
							{/* <Sorting list={originalCountriesList} onSort={updateList} /> */}
							<SearchField list={originalCountriesList} onSearch={updateList} />
							<CountriesList
								list={countries}
								onListUpdate={setCountries}
								onCountrySelect={getCountryInfo}
							/>
						</div>
					</div>
				</div>
				<div className="col-sm-8">
					{!selectedCountry &&
						<div className="card card-body bg-light"><em>Select a country to see its data</em></div>
					}
					{selectedCountry && <Statistics info={selectedCountry} />}
				</div>
			</div>
		</>
	);
};

export default Today;