import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

defaults.global.legend.display = false;

import './Statistics.scss';
import RadioGroup from '@shared/RadioGroup';
import Pager from '@shared/Pager';
import { rnd } from '@utils/math';
import NoData from '@shared/NoData';

const Statistics = props => {
	const {
		list
	} = props;

	const [showCase, setShowCase] = useState(1);
	const [selectedDate, setSelectedDate] = useState(new Date(moment().add(-1, 'days')));
	const [paginationPage, setPaginationPage] = useState(1);
	const [paginationCount, setPaginationCount] = useState(20);

	const onDateChange = event => setSelectedDate(event);
	const format = (date) => moment(date).format('M/D/YY');

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
		},
		tooltips: {
			enabled: true,
			callbacks: {
				title(tooltipItems, data) {
					const [tooltipItem] = tooltipItems;
					return data.tooltips[tooltipItem.index];
				},
				label(tooltipItem, data) {
					let label = data.datasets[tooltipItem.datasetIndex].label || '';

					return label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString(navigator.language);
				}
			}
		}
	};

	const data = (list, field) => {
		list = list.sort((a, b) => b.timeline[field][format(selectedDate)] - a.timeline[field][format(selectedDate)]).slice(paginationPage !== 1 ? paginationPage * paginationCount - paginationCount : 0, paginationPage * paginationCount);

		const settings = {
			fill: false,
			lineTension: 0.1,
			borderCapStyle: 'butt',
			borderDash: [],
			borderWidth: 0,
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			pointBackgroundColor: '#fff',
			pointBorderWidth: 1,
			pointHoverRadius: 3,
			pointHoverBorderWidth: 2,
			pointRadius: 2,
			pointHitRadius: 10,
		};

		const range = (count, callback) => new Array(count).fill(0).map($ => callback ? callback($) : $);
		return {
			// labels: list.map(item => item.country),
			tooltips: list.map(item => item.country + `${item.province ? ' (' + item.province + ')' : ''}`),
			labels: list.map(item => item.country + `${item.province ? ' (' + item.province + ')' : ''}`).map(item => item.length > 10 ? `${item.substring(0, 10)}...` : item),
			datasets: [{
				...settings,
				data: list.map(item => item.timeline[field][format(selectedDate)]),
				backgroundColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 0.5)`),
				// borderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointBorderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointHoverBackgroundColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointHoverBorderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
			}],
		};
	}

	if (!list.length) return <NoData />;

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

			<RadioGroup onChange={setShowCase} checkedValue={showCase} />

			{showCase === 1 &&
				<Bar options={chartOptions} data={data(list, 'cases')} />
			}

			{showCase === 2 &&
				<Bar options={chartOptions} data={data(list, 'deaths')} />
			}

			{showCase === 3 &&
				<Bar options={chartOptions} data={data(list, 'recovered')} />
			}

			<Pager
				onPageChange={setPaginationPage}
				onPageSizeChange={setPaginationCount}
				totalPages={9}
				totalRecords={list.length}
				pageSize={paginationCount}
				startPage={1}
			/>
		</div>
	);
};

Statistics.propTypes = {
	list: PropTypes.array
};

export default Statistics;