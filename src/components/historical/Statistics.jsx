import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Line, Bar } from 'react-chartjs-2';

import './Statistics.scss';

const Statistics = (props) => {
	const {
		info
	} = props;

	console.log(info);

	const [selectedDate, setSelectedDate] = useState(new Date);

	const currentCountry = info;

	currentCountry.perDay = {
		cases: processData(currentCountry.timeline.cases),
		deaths: processData(currentCountry.timeline.deaths),
		recovered: processData(currentCountry.timeline.recovered),
	};

	console.log(currentCountry);

	const onDateChange = event => setSelectedDate(event);

	function processData(source) {
		let previousValue = null;
		let target = {};

		Object.entries(source).forEach(item => {
			let [date, value] = item;

			target[date] = previousValue ? value - previousValue : value;

			previousValue = value;
		});

		return target;
	}

	const format = (date) => {
		return moment(date).format('M/D/YY');
	}

	const data = (options) => {
		console.log(`rgba(${options.rgb},0.4)`)
		return {
			labels: options.labels || [],
			datasets: [
				{
					label: options.label || '',
					fill: false,
					lineTension: 0.1,
					backgroundColor: `rgba(${options.rgb},0.4)`,
					borderColor: `rgba(${options.rgb},1)`,
					borderCapStyle: 'butt',
					borderDash: [],
					// borderWidth: 0,
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: `rgba(${options.rgb},1)`,
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: `rgba(${options.rgb},1)`,
					pointHoverBorderColor: `rgba(${options.rgb},1)`,
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
					data: options.data || []
				}
			]
		};
	}


return (
	<div className="card card-body bg-light">
		<DatePicker
			selected={selectedDate}
			onChange={onDateChange}
			isClearable
			maxDate={new Date}
			minDate={new Date('01-22-2020')}
			dateFormat="MM-dd-yyyy"
			className="form-control"
		/>
		<h3 className="mt-4 mb-4">{info.country} {info.province && `(${info.province})`}</h3>
		<dl>
			<dt>Cases per day</dt><dd><span className={`badge ${currentCountry.perDay.cases[format(selectedDate)] !== undefined && 'badge-secondary'}`}>{currentCountry.perDay.cases[format(selectedDate)] === undefined ? '—' : currentCountry.perDay.cases[format(selectedDate)]}</span></dd>
			<dt>Deaths per day</dt><dd><span className={`badge ${currentCountry.perDay.deaths[format(selectedDate)] !== undefined && 'badge-secondary'}`}>{currentCountry.perDay.deaths[format(selectedDate)] === undefined ? '—' : currentCountry.perDay.deaths[format(selectedDate)]}</span></dd>
			<dt>Recovered per day</dt><dd><span className={`badge ${currentCountry.perDay.recovered[format(selectedDate)] !== undefined && 'badge-secondary'}`}>{currentCountry.perDay.recovered[format(selectedDate)] === undefined ? '—' : currentCountry.perDay.recovered[format(selectedDate)]}</span></dd>
		</dl>
		
		<Line data={data({
			label: '# of Cases',
			labels: Object.keys(info.timeline.cases),
			data: Object.values(info.timeline.cases),
			rgb: '54, 162, 235'
		})} />

		<br className="mt-4" />

		<Bar data={data({
			label: '# of Deaths',
			labels: Object.keys(info.perDay.deaths),
			data: Object.values(info.perDay.deaths),
			rgb: '255, 99, 132'
		})} />
	</div>
);
};

Statistics.propTypes = {
	info: PropTypes.object
};

export default Statistics;