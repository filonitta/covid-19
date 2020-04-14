import React, { useState, useContext, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import api from '@/services/api.class';
import CountriesList from '@shared/CountriesList';
import SearchField from '@shared/SearchField';
import Statistics from './Statistics';
import Context from '@redux/store';
import { todayListAction, todaySelectedAction, todayMetaAction } from '@redux/actions';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const Today = () => {
	const { store, dispatch } = useContext(Context);
	const [isLoading, setIsLoading] = useState(false);
	const {
		today: {
			list: countries,
			selectedItem: selectedCountry,
			meta: {
				searchValue
			}
		}
	} = store;

	useEffect(() => {
		async function fetchInfo() {
			setIsLoading(true);
			let data = await api.getTodayInfo();

			// data = data.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0);
			data = data.sort((a, b) => b.cases - a.cases);

			dispatch( todayListAction(data) );
			setIsLoading(false);
		}

		fetchInfo();
	}, [dispatch]);

	const updateList = (list, searchValue) => {
		dispatch(todayListAction(list));
		dispatch(todayMetaAction({ searchValue }));
	};

	const setSelectedCountry = (data) => dispatch(todaySelectedAction(data));

	if (isLoading && !countries.length) return <Spinner className="loader" animation="border" variant="primary" />;

	return (
		<>
			<div className="row">
				<div className="col-md-4">
					<div className="card">
						<div className="card-header text-white bg-secondary">
							Countries
						</div>
						<div className="card-body">
							<SearchField value={searchValue} list={countries} onChange={updateList} />
							<CountriesList
								list={countries}
								onListUpdate={updateList}
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