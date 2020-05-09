import React, { useState, useContext, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Bar, Pie } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'chartjs-plugin-zoom';
import { defaults } from 'react-chartjs-2';

import './Statistics.scss';
import ShowCasesRadioGroup from '@shared/ShowCasesRadioGroup';
import ChartTypeRadioGroup from './ChartTypeRadioGroup';
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
		paginationPage,
		chartType
	} = meta;

	useEffect(() => {
		!selectedDate && dispatch( allMetaAction({ selectedDate: new Date(moment().add(-1, 'days')) }) );
	}, [dispatch, selectedDate]);

	const chartOptions = {
		legend: {
			display: chartType === 'pie',
			position: 'left',
			labels: {
				padding: 10
			}
		},
		scales: {
			yAxes: [{
				ticks: {
					beginAtZero: true,
					padding: chartType === 'bar' ? 5 : 0,
					display: chartType === 'bar'
				},
				gridLines: {
					display: chartType === 'bar',
				},
			}],
			xAxes: [{
				ticks: {
					padding: chartType === 'bar' ? 10 : 0,
					display: chartType === 'bar'
				},
				gridLines: {
					display: chartType === 'bar',
				},
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
					label += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString(navigator.language);
					if (chartType === 'pie') {
						label += ` (${(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] * 100 / getTotalCases()).toFixed(2)}%)`;
					}
					return label;
				},
				afterBody() {},
				footer(tooltipItems, data) {
					const [tooltipItem] = tooltipItems;
					return [`Lethality: ${(data.deaths[tooltipItem.index] * 100 / data.cases[tooltipItem.index]).toFixed(2)}%`];
				},
			}
		},
		pan: {
			enabled: true,
			mode: 'x'
		},
		zoom: {
			enabled: false,
			drag: true,
			mode: 'xy'
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
	const onSetChartType = event => dispatch( allMetaAction({ chartType: event }) );
	const onSetPaginationPage = event => dispatch( allMetaAction({ paginationPage: event }) );
	const Element = chartType === 'bar' ? Bar : Pie;

	const getTotalCases = () => {
		const matches = { 1: 'cases', 2: 'deaths', 3: 'recovered' };
		const field = matches[showCase];
		const listProcessed = list.sort((a, b) => b.timeline[field][format(selectedDate, 'M/D/YY')] - a.timeline[field][format(selectedDate, 'M/D/YY')]).slice(paginationPage !== 1 ? paginationPage * paginationCount - paginationCount : 0, paginationPage * paginationCount);
		return listProcessed.reduce((sum, item) => sum += item.timeline[field][format(selectedDate, 'M/D/YY')], 0);
	};

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

			<div className="row mt-4 mb-4">
				<div className="col-sm-6">
					<ChartTypeRadioGroup onChange={onSetChartType} checkedValue={chartType} />
				</div>
				<div className="col-sm-6">
					<ShowCasesRadioGroup onChange={onSetShowCase} checkedValue={showCase} className="mt-4 mt-sm-0" />
				</div>
			</div>

			{chartType === 'pie' && <span className="badge total-pie">Total on page: {getTotalCases().toLocaleString(navigator.language)} (100%)</span>}

			{showCase === 1 &&
				<Element options={chartOptions} data={data(list, 'cases')} />
			}

			{showCase === 2 &&
				<Element options={chartOptions} data={data(list, 'deaths')} />
			}

			{showCase === 3 &&
				<Element options={chartOptions} data={data(list, 'recovered')} />
			}


			<Pager
				onPageChange={onSetPaginationPage}
				onPageSizeChange={onSetPaginationCount}
				totalPages={7}
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