import React, { useState, useEffect, useCallback, useContext } from 'react';
// import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';

import api from '@/services/api.class';
import CountriesList from '@shared/CountriesList';
import SearchField from '@shared/SearchField';
import Sorting from './Sorting';
import Period from '@shared/Period';
import Statistics from './Statistics';
import Context from '@redux/store';
import { dayListAction, dayMetaAction, daySelectedAction } from '@redux/actions';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalPerDay = () => {
	const { store, dispatch } = useContext(Context);
	const {
		day: {
			list: countries,
			selectedItem: selectedCountry,
			meta
		}
	} = store;

	const {
		period,
		sortField,
		searchValue
	} = meta;

	// console.log(store)
	// const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [resetSearchList, setResetSearchList] = useState(false);
	// const [selectedCountry, setSelectedCountry] = useState(null);
	// const [period, setPeriod] = useState(30);
	// const [searchValue] = useState('');
	// const [sortField, setSortField] = useState('country');
	
	useEffect(() => {
		// console.log(period)
		async function fetchCountries() {
			setIsLoading(true);
			const data = await api.getCountries(period);

			data.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0).forEach(item => {
				item.country = item.country.capitalize();
				if (item.province) {
					item.province = item.province.capitalize();
				}
			});

			// setCountries(data);
			// console.log(data)
			dispatch( dayListAction(data) );

			setIsLoading(false);

			setCurrentCountryHandler(data);
			setResetSearchList(true);
		}
		
		fetchCountries();

		/* return () => {
			dispatch(dayListAction([]));
		}; */
	}, [period, setCurrentCountryHandler, dispatch]);
	
	const setCurrentCountryHandler = useCallback((countries) => {
		countries.length && selectedCountry && onSetSelectedCountry(countries.find(item => item.country === selectedCountry.country));
	}, [selectedCountry, onSetSelectedCountry]);

	const handleSearch = (data, searchValue) => {
		console.count('handleSearch');
		// console.log('data', data)
		// setCountries(data);
		dispatch(dayMetaAction({ searchValue }));
		onSetCountries(data);
	};

	const handleSort = (list, sortField) => {
		// onSetSortField(field);
		// setCountries(list);
		dispatch(dayMetaAction({ sortField }));
		onSetCountries(list);
	};
	
	const onSetCountries = data => dispatch( dayListAction(data) );
	const onSetPeriod = data => dispatch( dayMetaAction({ period: data }) );
	// const onSetSortField = data => dispatch( dayMetaAction({ sortField: data }) );
	const onSetSelectedCountry = useCallback(data => {
		// console.log(data)
		dispatch( daySelectedAction(data) );
	}, [dispatch]);

	if (isLoading && !countries.length) return <Spinner className="loader" animation="border" variant="primary" />;

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
							<Period onChange={onSetPeriod} value={period} />
							<Sorting sortField={sortField} list={countries} onSort={handleSort} />
							<SearchField value={searchValue} list={countries} onSearch={handleSearch} reset={resetSearchList} />
							<CountriesList
								list={countries}
								onListUpdate={onSetCountries}
								onCountrySelect={onSetSelectedCountry}
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