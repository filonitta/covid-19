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
import { aggregateByCountryName } from '@utils/countries';
import ErorMessage from '@shared/ErorMessage';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalPerDay = () => {
	const { store, dispatch } = useContext(Context);
	const [errorMessage, setErrorMessage] = useState('');

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

	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingNext, setIsLoadingNext] = useState(false);
	const [resetSearchList, setResetSearchList] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			let data = await api.getCountries(period).catch(setErrorMessage);

			if (data) {
				data = aggregateByCountryName(data);
				dispatch( dayListAction(data) );
				setCurrentCountryHandler(data);
				setResetSearchList(true);
			}

			setIsLoading(false);
			setIsLoadingNext(false);

		}

		fetchCountries();
	}, [period, setCurrentCountryHandler, dispatch]);

	const setCurrentCountryHandler = useCallback((countries) => {
		countries.length && selectedCountry && onSetSelectedCountry(countries.find(item => item.country === selectedCountry.country));
	}, [selectedCountry, onSetSelectedCountry]);

	const handleSearch = (data, searchValue) => {
		// console.count('handleSearch');
		// console.log('data', data)
		dispatch(dayMetaAction({ searchValue }));
		onSetCountries(data);
	};

	const handleSort = (list, sortField) => {
		dispatch(dayMetaAction({ sortField }));
		onSetCountries(list);
	};

	const handleSetPeriod = data => {
		setIsLoadingNext(true);
		dispatch(dayMetaAction({ period: data }));
	};

	const onSetCountries = data => dispatch( dayListAction(data) );
	const onSetSelectedCountry = useCallback(data => dispatch( daySelectedAction(data) ), [dispatch]);

	if (errorMessage) return <ErorMessage />;

	if (isLoading && !countries.length) return <Spinner className="loader" animation="border" variant="primary" />;

	return (
		<>
			{isLoadingNext && <Spinner className="loader" animation="border" variant="primary" />}
			<div className="row">
				<div className="col-md-4">
					<div className="card">
						<div className="card-header text-white bg-secondary">
							Countries
						</div>
						<div className="card-body">
							<Period onChange={handleSetPeriod} value={period} />
							<Sorting sortField={sortField} list={countries} onChange={handleSort} />
							<SearchField value={searchValue} list={countries} onChange={handleSearch} reset={resetSearchList} />
							<CountriesList
								list={countries}
								onListUpdate={onSetCountries}
								onCountrySelect={onSetSelectedCountry}
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

export default HistoricalPerDay;