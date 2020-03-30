import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import api from '@/services/api.class';
import CountriesList from './CountriesList';
import SearchField from './SearchField';
import Statistics from './Statistics';

String.prototype.capitalize = function () {
	// const value = this.valueOf().split(' ');
	// return value.map(str => `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`).join(' ');
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const Historical = () => {
	const [countries, setCountries] = useState([]);
	const [originalCountriesList, setOriginalCountriesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const countries = await api.getCountries();

			countries.forEach(item => {
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

	const updateList = (list) => {
		setCountries(list);
	}

	return (
		<>
			{/* <h2 className="mt-5 mb-5">per day</h2> */}
			<div className="row">
				<div className="col-sm-4">
					<div className="card">
						<div className="card-header text-white bg-primary">
							Countries
						</div>
						<div className="card-body">
							<SearchField list={originalCountriesList} onSearch={updateList} />
							{!isLoading &&
								<CountriesList
									list={countries}
									onListUpdate={setCountries}
									onCountrySelect={setSelectedCountry}
								/>
							}
						</div>
					</div>
				</div>
				<div className="col-sm-8">
					{selectedCountry && <Statistics info={selectedCountry} />}
				</div>
			</div>
		</>
	);
};

/* class Historical extends React.Component {
	state = {
		countries: []
	}

	async componentDidMount() {
		const countries = await api.getCountries();
		this.setState({ countries });
	}

	updateList = countries => {
		this.setState({ countries });
	}

	render() {
		const {
			countries
		} = this.state;

		console.log(countries)

		return <>
			<h1>COVID-19 statistics per day</h1>
			<div className="row">
				<div className="col-sm-4">
					<div className="card">
						<div className="card-header">
							Countries
					</div>
						<div className="card-body">
							<SearchField list={countries} onSearch={this.updateList} />
							<CountriesList list={countries} />
						</div>
					</div>
				</div>
				<div className="col-sm-8"></div>
			</div>
		</>
	}
} */

export default Historical;