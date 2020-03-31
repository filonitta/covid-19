import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Pagination from 'react-bootstrap/Pagination';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

defaults.global.legend.display = false;

import './Statistics.scss';
import RadioGroup from '@shared/RadioGroup';
import { range } from '@utils/math';

const Statistics = props => {
	const {
		list
	} = props;

	const [showCase, setShowCase] = useState(1);
	const [selectedDate, setSelectedDate] = useState(new Date);
	const [paginationPage, setPaginationPage] = useState(1);
	const [paginationCount, setPaginationCount] = useState(20);
	const [paginationVisibleItems, setPaginationVisibleItems] = useState(10);

	const rnd = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - Math.ceil(min) + 1)) + Math.ceil(min);
	};

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

	
		return {
			labels: list.map(item => item.country),
			// labels: list.map(item => item.country + `${item.province ? '(' + item.province + ')' : ''}`),
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

	const setPage = page => () => setPaginationPage(page);

	const generatePaginationItems = () => {
		const data = [];
		range(Math.ceil(list.length / paginationCount)).forEach((item, index) => {
			if (index < Math.round(paginationVisibleItems / 2) || index >= Math.ceil(list.length / paginationCount) - Math.round(paginationVisibleItems / 2)) {
				data.push({
					value: 1,
					index
				});
				return;
			}
			
			if (!data.find(item => item.value === 0)) data.push({
				value: 0,
				index
			});
		});

		return data.map((item, index) => item.value ? <Pagination.Item key={index} active={paginationPage === item.index + 1} onClick={setPage(item.index + 1)}>{item.index + 1}</Pagination.Item> : <Pagination.Ellipsis key={index} disabled />);
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

			<RadioGroup onChange={setShowCase} checkedValue={showCase} />
			
			{list.length !== 0 && <>
			{showCase === 1 &&
			<Bar options={chartOptions} data={data(list, 'cases')} />
			}

			{showCase === 2 &&
			<Bar options={chartOptions} data={data(list, 'deaths')} />
			}

			{showCase === 3 &&
			<Bar options={chartOptions} data={data(list, 'recovered')} />
			}
			</>}

			<div className="pagination-controls">
				<select
					className="form-control"
					style={{ width: '100px' }}
					onChange={event => setPaginationCount(event.target.value)}
					defaultValue={'20'}
			>
					<option value="20">20</option>
					<option value="30">30</option>
					<option value="40">40</option>
				</select>

				<Pagination>
					<Pagination.First onClick={setPage(1)} disabled={paginationPage === 1} />
					<Pagination.Prev onClick={setPage(paginationPage - 1)} disabled={paginationPage === 1} />
					{/* {generatePaginationItems()} */}

					{range(Math.ceil(list.length / paginationCount)).map((item, index) => (
						<Pagination.Item key={index} active={paginationPage === index + 1} onClick={setPage(index + 1)}>{index + 1}</Pagination.Item>
					))}

					{/* <Pagination.Ellipsis />

					<Pagination.Item>{10}</Pagination.Item>
					<Pagination.Item>{11}</Pagination.Item>
					<Pagination.Item active>{12}</Pagination.Item>
					<Pagination.Item>{13}</Pagination.Item>
					<Pagination.Item disabled>{14}</Pagination.Item>

					<Pagination.Ellipsis />
					<Pagination.Item>{20}</Pagination.Item> */}
					<Pagination.Next onClick={setPage(paginationPage + 1)} disabled={paginationPage === Math.ceil(list.length / paginationCount)} />
					<Pagination.Last onClick={setPage(Math.ceil(list.length / paginationCount))} disabled={paginationPage === Math.ceil(list.length / paginationCount)} />
				</Pagination>
			</div>
		</div>
	);
};

Statistics.propTypes = {
	list: PropTypes.array
};

export default Statistics;