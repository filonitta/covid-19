import React, { useState, useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import 'react-datepicker/dist/react-datepicker.css';

import api from '@/services/api.class';
import Statistics from './Statistics';
import Context from '@redux/store';
import { allListAction } from '@redux/actions';
import { arraysEqual } from '@utils/array';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalCountries = () => {
	const { store, dispatch } = useContext(Context);
	const {
		all: {
			list: countries,
		}
	} = store;

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			let data = await api.getCountries(360);
			
			data = aggregateByCountryName(data);
			
			dispatch( allListAction(data) );
			setIsLoading(false);
		}

		fetchCountries();
	}, [dispatch]);

	const aggregateByCountryName = (list) => {
		const countries = [];
		
		list.forEach((item, i, source) => {
			const country = item.country;
			
			if (countries.find(item => item.country === country)) return;

			const timeline = {
				cases: {},
				deaths: {},
				recovered: {}
			};
	
			const provinces = source.filter(item => item.country === country);

			const result = {
				country,
				timeline
			};

			provinces.forEach((province) => {
				const dates = Object.keys(province.timeline.cases);
				
				const values = Object.keys(timeline).reduce((values, field) => {
					values[field] = Object.values(province.timeline[field]);
					return values;
				}, {});
				
				dates.forEach((date, i) => {
					Object.keys(timeline).forEach(field => {
						result.timeline[field][date] = result.timeline[field][date] ? result.timeline[field][date] + values[field][i] : values[field][i];
					});
				});
			}, item);

			countries.push(result);

			/* { // test
				const testField = 'recovered';
				const dates = Object.keys(provinces[0].timeline.cases);
				const lastDate = dates[dates.length - 1];
				const value = provinces.reduce((value, item) => value + item.timeline[testField][lastDate], 0);
				console.log(value === result.timeline[testField][lastDate]);
			} */
		});

		return countries;
	};

	return (
		<>
			{!countries.length ? <Spinner className="loader" animation="border" variant="primary" /> : (
				<div className="card card-body bg-light statistics">
					<Statistics list={countries} />
				</div>
			)}
		</>
	)
};

export default HistoricalCountries;