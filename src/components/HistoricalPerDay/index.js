import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import api from '@/services/api.class';
import CountriesList from '@shared/CountriesList';
import SearchField from '@shared/SearchField';
import Sorting from './Sorting';
import Period from '@shared/Period';
import Statistics from './Statistics';
// import NoData from '@shared/NoData';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalPerDay = () => {
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [randomKey, setRandomKey] = useState(Math.random());
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [period, setPeriod] = useState(30);
	const [searchValue, setSearchValue] = useState('');
	const [sortField, setSortField] = useState('country');

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const data = await api.getCountries(period);

			data.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0).forEach(item => {
				item.country = item.country.capitalize();
				if (item.province) {
					item.province = item.province.capitalize();
				}
			});

			setCountries(data);

			setIsLoading(false);
		}

		fetchCountries();
	}, [period]);

	useEffect(() => {
		selectedCountry && setSelectedCountry(countries.find(item => item.country === selectedCountry.country));
	}, [countries, selectedCountry]);

	const handleSearch = (data) => {
		setCountries(data);
	};

	const handleSort = (list, field) => {
		setSortField(field);
		setCountries(list);
	};

	return (
		<>
			{isLoading && <Spinner className="loader" animation="border" variant="primary" />}
			<div className="row">
				<div className="col-sm-4">
					<div className="card">
						<div className="card-header text-white bg-secondary">
							Countries
						</div>
						<div className="card-body">
							<Period onChange={setPeriod} />
							<Sorting sortField={sortField} list={countries} onSort={handleSort} />
							<SearchField initialValue={searchValue} list={countries} onSearch={handleSearch} />
							<CountriesList
								list={countries}
								onListUpdate={setCountries}
								onCountrySelect={setSelectedCountry}
							/>
						</div>
					</div>
				</div>
				<div className="col-sm-8">
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

export default HistoricalPerDay;