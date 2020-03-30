import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import api from '@/services/api.class';
import CountriesList from './CountriesList';
import SearchField from './SearchField';

const Historical = () => {
	const [countries, setCountries] = useState([]);
	const [originalCountriesList, setOriginalCountriesList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const countries = await api.getCountries();
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
		<h1>COVID-19 statistics per day</h1>
		<div className="row">
			<div className="col-sm-4">
				<div className="card">
					<div className="card-header">
						Countries
					</div>
					<div className="card-body">
						<SearchField list={originalCountriesList} onSearch={updateList} />
						{!isLoading &&
						<CountriesList list={countries} onListUpdate={setCountries} />
						}
					</div>
				</div>
			</div>
			<div className="col-sm-8"></div>
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