import React, { useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { defaults } from 'react-chartjs-2';
defaults.global.legend.display = false;
defaults.global.tooltips.titleMarginBottom = 15;
defaults.global.tooltips.footerMarginTop = 10;

import './Statistics.scss';
import RadioGroup from '@shared/RadioGroup';
import Pager from '@shared/Pager';
import { rnd } from '@utils/math';
import { format } from '@utils/date';
import Context from '@redux/store';
import { allMetaAction } from '@redux/actions';

const Statistics = props => {
	const { store, dispatch } = useContext(Context);

	const {
		all: {
			// list,
			meta,
		}
	} = store;
	
	const {
		list,
	} = props;

	const {
		selectedDate,
		paginationCount,
		showCase,
		paginationPage
	} = meta;

	// const [showCase, setShowCase] = useState(1);
	// const [paginationPage, setPaginationPage] = useState(1);
	// const [paginationCount, setPaginationCount] = useState(20);

	useEffect(() => {
		!selectedDate && dispatch( allMetaAction({ selectedDate: new Date(moment().add(-1, 'days')) }) );
	}, [dispatch, selectedDate]);

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
					return data.countries[tooltipItem.index];
				},
				label(tooltipItem, data) {
					let label = data.datasets[tooltipItem.datasetIndex].label || '';
					return label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString(navigator.language);
				},
				afterBody() {},
				footer(tooltipItems, data) {
					const [tooltipItem] = tooltipItems;
					return [`Lethality: ${(data.deaths[tooltipItem.index] * 100 / data.cases[tooltipItem.index]).toFixed(2)}%`];
				},
			}
		}
	};

	useEffect(() => {
		if (!meta.colors.length) {
			const range = (count, callback) => new Array(count).fill(0).map($ => callback ? callback($) : $);
			const colors = range(list.length, () => `${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}`);
			dispatch(allMetaAction({ colors }));
		}
	}, [dispatch, list, meta.colors.length]);

	const data = useCallback((list, field) => {
		list = list.sort((a, b) => b.timeline[field][format(selectedDate, 'M/D/YY')] - a.timeline[field][format(selectedDate, 'M/D/YY')]).slice(paginationPage !== 1 ? paginationPage * paginationCount - paginationCount : 0, paginationPage * paginationCount);
		
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

		const colors = meta.colors.slice(paginationPage !== 1 ? paginationPage * paginationCount - paginationCount : 0, paginationPage * paginationCount);

		return {
			cases: list.map(item => item.timeline.cases[format(selectedDate, 'M/D/YY')]),
			deaths: list.map(item => item.timeline.deaths[format(selectedDate, 'M/D/YY')]),
			countries: list.map(item => item.country + `${item.province ? ' (' + item.province + ')' : ''}`),
			labels: list.map(item => item.country + `${item.province ? ' (' + item.province + ')' : ''}`).map(item => item.length > 10 ? `${item.substring(0, 10)}...` : item),
			datasets: [{
				...settings,
				data: list.map(item => item.timeline[field][format(selectedDate, 'M/D/YY')]),
				backgroundColor: colors.map(value => `rgba(${value}, 0.5)`),
				hoverBackgroundColor: colors.map(value => `rgba(${value}, 0.7)`),
				// borderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointBorderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointHoverBackgroundColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointHoverBorderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
			}],
		};
	}, [meta.colors, paginationPage, paginationCount, selectedDate]);

	const getMinDate = () => {
		const [info] = list;
		const [firstDate] = Object.keys(info.timeline.cases);
		return new Date(format(firstDate));
	};

	const onDateChange = event => dispatch( allMetaAction({ selectedDate: event }) );
	const onSetPaginationCount = event => dispatch( allMetaAction({ paginationCount: event }) );
	const onSetShowCase = event => dispatch( allMetaAction({ showCase: event }) );
	const onSetPaginationPage = event => dispatch( allMetaAction({ paginationPage: event }) );

	return (
		<>
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

			<RadioGroup onChange={onSetShowCase} checkedValue={showCase} className="mt-4" />

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
				onPageChange={onSetPaginationPage}
				onPageSizeChange={onSetPaginationCount}
				totalPages={9}
				totalRecords={list.length}
				pageSize={paginationCount}
				startPage={paginationPage}
			/>
		</>
	);
};

Statistics.propTypes = {
	list: PropTypes.array,
};

export default Statistics;