import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import Pagination from 'react-bootstrap/Pagination';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

defaults.global.legend.display = false;
// defaults.global.responsive = false;

import './Statistics.scss';

const Statistics = (props) => {
	const {
		list
	} = props;

	// console.log(list);

	const [showCase, setShowcase] = useState(1);
	const [selectedDate, setSelectedDate] = useState(new Date);
	const [paginationPage, setPaginationPage] = useState(1);
	const [paginationCount, setPaginationCount] = useState(20);
	
	const rnd = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - Math.ceil(min) + 1)) + Math.ceil(min);
	};

	const onDateChange = event => setSelectedDate(event);
	const format = (date) => moment(date).format('M/D/YY');

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
			pointHitRadius: 10
		};
		
		return {
			labels: list.map(item => item.country),
			datasets: [{
				...settings,
				data: list.map(item => item.timeline[field][format(selectedDate)]),
				backgroundColor: new Array(list.length).fill(0).map(() => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 0.4)`),
				borderColor: new Array(list.length).fill(0).map(() => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				pointBorderColor: new Array(list.length).fill(0).map(() => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				pointHoverBackgroundColor: new Array(list.length).fill(0).map(() => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				pointHoverBorderColor: new Array(list.length).fill(0).map(() => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
			}],
			
		};
	}

	const onChangeCase = type => () => setShowcase(type);

	const setPage = page => () => setPaginationPage(page);

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

			<div className="show-case-controls mt-4">
				<strong>Show:</strong>
				<div className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" id="cases" name="show-case" onChange={onChangeCase(1)} checked={showCase === 1} />
					<label className="custom-control-label" htmlFor="cases">Cases</label>
				</div>
				<div className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" id="deaths" name="show-case" onChange={onChangeCase(2)} checked={showCase === 2} />
					<label className="custom-control-label" htmlFor="deaths">Deaths</label>
				</div>

				<div className="custom-control custom-radio">
					<input type="radio" className="custom-control-input" id="recovered" name="show-case" onChange={onChangeCase(3)} checked={showCase === 3} />
					<label className="custom-control-label" htmlFor="recovered">Recovered</label>
				</div>
			</div>
			
			{list.length !== 0 && <>
			{showCase === 1 &&
				<Bar data={data(list, 'cases')} />
			}

			{showCase === 2 &&
			<Bar data={data(list, 'deaths')} />
			}

			{showCase === 3 &&
			<Bar data={data(list, 'recovered')} />
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
					{new Array(Math.ceil(list.length / paginationCount)).fill(0).map((item, index) => (
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