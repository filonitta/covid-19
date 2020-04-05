import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import api from '@/services/api.class';
import Statistics from './Statistics';
import { format } from '@utils/date';
import Period from '@shared/Period';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
}

const HistoricalCountries = () => {
	const [countries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [period, setPeriod] = useState(30);
	const [selectedDate, setSelectedDate] = useState(new Date(moment().add(-1, 'days')));	

	useEffect(() => {
		async function fetchCountries() {
			setIsLoading(true);
			const countries = await api.getCountries(360);
			
			countries.sort((a, b) => b.country > a.country ? -1 : b.country < a.country ? 1 : 0).forEach(item => {
				item.country = item.country.capitalize();
				if (item.province) {
					item.province = item.province.capitalize();
				}
			});
			
			setCountries(countries);
			setIsLoading(false);
		}

		fetchCountries();
	}, []);

	const getMinDate = () => {
		const [info] = countries;
		const [firstDate] = Object.keys(info.timeline.cases);
		return new Date(format(firstDate));
	};

	const onDateChange = event => setSelectedDate(event);

	return (
		<>{!countries.length ? <Spinner className="loader" animation="border" variant="primary" /> : (
			<div className="card card-body bg-light statistics">
				<div className="input-group">
					<div className="input-group-prepend">
						<span className="input-group-text">
							<FontAwesomeIcon icon={faCalendarAlt} />
						</span>
					</div>
					<DatePicker
						selected={selectedDate}
						onChange={onDateChange}
						isClearable={false}
						maxDate={new Date}
						minDate={getMinDate()}
						dateFormat="MM-dd-yyyy"
						className="form-control"
					/>
				</div>
				<Statistics list={countries} selectedDate={format(selectedDate, 'M/D/YY')} />
			</div>
		) }
		</>
	)
};

export default HistoricalCountries;