import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Line, Bar } from 'react-chartjs-2';

import RadioGroup from '@shared/RadioGroup';

const Statistics = (props) => {
	const {
		info
	} = props;

	const [selectedDate, setSelectedDate] = useState(new Date);
	const [showCase, setShowCase] = useState(1);

	const currentCountry = info;

	currentCountry.perDay = {
		cases: processData(currentCountry.timeline.cases),
		deaths: processData(currentCountry.timeline.deaths),
		recovered: processData(currentCountry.timeline.recovered),
	};

	const chartOptions = {
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
					padding: 5
				},
			}],
			xAxes: [{
				ticks: {
					padding: 10
				}
			}]
		}
	};

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

	const format = (date) => moment(date).format('M/D/YY');

	const data = (options) => {
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
					data: options.data || [],
					
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
				<dt>Cases per day</dt><dd><span className={`badge ${currentCountry.perDay.cases[format(selectedDate)] !== undefined && 'badge-secondary'}`}>{currentCountry.perDay.cases[format(selectedDate)] === undefined ? '—' : currentCountry.perDay.cases[format(selectedDate)].toLocaleString(navigator.language)}</span></dd>
				<dt>Deaths per day</dt><dd><span className={`badge ${currentCountry.perDay.deaths[format(selectedDate)] !== undefined && 'badge-secondary'}`}>{currentCountry.perDay.deaths[format(selectedDate)] === undefined ? '—' : currentCountry.perDay.deaths[format(selectedDate)].toLocaleString(navigator.language)}</span></dd>
				<dt>Recovered per day</dt><dd><span className={`badge ${currentCountry.perDay.recovered[format(selectedDate)] !== undefined && 'badge-secondary'}`}>{currentCountry.perDay.recovered[format(selectedDate)] === undefined ? '—' : currentCountry.perDay.recovered[format(selectedDate)].toLocaleString(navigator.language)}</span></dd>
			</dl>

			<RadioGroup onChange={setShowCase} checkedValue={showCase} className="mb-2" />
			
			{showCase === 1 &&
			<Line options={chartOptions} data={data({
				label: '# of Cases',
				labels: Object.keys(info.timeline.cases),
				data: Object.values(info.timeline.cases),
				rgb: '54, 162, 235'
			})} />
			}
			{/* <Bar options={chartOptions} data={data({
				label: '# of Cases',
				labels: Object.keys(info.perDay.cases),
				data: Object.values(info.perDay.cases),
				rgb: '54, 162, 235'
			})} /> */}

			{showCase === 2 &&
			<Bar options={chartOptions} data={data({
				label: '# of Deaths',
				labels: Object.keys(info.perDay.deaths),
				data: Object.values(info.perDay.deaths),
				rgb: '255, 99, 132'
			})} />
			}

			{showCase === 3 &&
			<Bar options={chartOptions} data={data({
				label: '# of Recovered',
				labels: Object.keys(info.perDay.recovered),
				data: Object.values(info.perDay.recovered),
				rgb: '75, 192, 192'
			})} />
			}
		</div>
	);
};

Statistics.propTypes = {
	info: PropTypes.object
};

export default Statistics;