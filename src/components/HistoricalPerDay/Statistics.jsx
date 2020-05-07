import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';

import './Statistics.scss';
import ShowCasesRadioGroup from '@shared/ShowCasesRadioGroup';
import { format } from '@utils/date';
import Context from '@redux/store';
import { dayMetaAction } from '@redux/actions';

const Statistics = (props) => {
	const {
		info
	} = props;

	const { store, dispatch } = useContext(Context);
	const {
		day: {
			meta
		}
	} = store;

	const {
		selectedDate,
		showCase,
		chartType,
		period
	} = meta;

	useEffect(() => {
		!selectedDate && dispatch(dayMetaAction({ selectedDate: new Date }));
	}, [dispatch, selectedDate]);

	info.perDay = {
		cases: processData(info.timeline.cases),
		deaths: processData(info.timeline.deaths),
		recovered: processData(info.timeline.recovered),
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
		},
		pan: {
			enabled: true,
			mode: 'x'
		},
		zoom: {
			enabled: false,
			drag: true,
			mode: 'xy'
		},
		tooltips: {
			enabled: true,
			callbacks: {
				label(tooltipItem, data) {
					let label = data.datasets[tooltipItem.datasetIndex].label || 'Label';
					return label += ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString(navigator.language);
				},
			}
		},
	};

	const onDateChange = event => dispatch( dayMetaAction({ selectedDate: event }) );

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

	const data = (options) => {
		const firstItem = period === 0 ? 0 : 1;

		return {
			labels: options.labels.slice(firstItem) || [],
			datasets: [
				{
					label: options.label.slice(firstItem) || '',
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
					data: options.data.slice(firstItem) || [],
					
				}
			]
		};
	};

	const getMinDate = () => {
		const [firstDate, secondDate] = Object.keys(info.timeline.cases);
		return new Date(format( period === 0 ? firstDate : secondDate ));
	};

	const onChangeChartType = event => dispatch(dayMetaAction({ chartType: +event.target.value }));

	const onSetShowCase = event => dispatch(dayMetaAction({ showCase: event }));

	return (
		<div className="card card-body bg-light">
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
			<h3 className="mt-4 mb-4">{info.country} {info.province && `(${info.province})`}</h3>
			<dl>
				<dt>Cases per day</dt><dd><span className={`badge ${info.perDay.cases[format(selectedDate, 'M/D/YY')] !== undefined && 'badge-secondary'}`}>{info.perDay.cases[format(selectedDate, 'M/D/YY')] === undefined ? '—' : info.perDay.cases[format(selectedDate, 'M/D/YY')].toLocaleString(navigator.language)}</span></dd>
				<dt>Deaths per day</dt><dd><span className={`badge ${info.perDay.deaths[format(selectedDate, 'M/D/YY')] !== undefined && 'badge-secondary'}`}>{info.perDay.deaths[format(selectedDate, 'M/D/YY')] === undefined ? '—' : info.perDay.deaths[format(selectedDate, 'M/D/YY')].toLocaleString(navigator.language)}</span></dd>
				<dt>Recovered per day</dt><dd><span className={`badge ${info.perDay.recovered[format(selectedDate, 'M/D/YY')] !== undefined && 'badge-secondary'}`}>{info.perDay.recovered[format(selectedDate, 'M/D/YY')] === undefined ? '—' : info.perDay.recovered[format(selectedDate, 'M/D/YY')].toLocaleString(navigator.language)}</span></dd>
			</dl>

			<div className="controls mb-3 mb-md-2">
				<ShowCasesRadioGroup onChange={onSetShowCase} checkedValue={showCase} />
				<div className="chart-type-controls">
					<select className="form-control" defaultValue={chartType} onChange={onChangeChartType}>
						<option value="1">Progress</option>
						<option value="2">Per day</option>
					</select>
				</div>
				
			</div>


			{chartType === 1 && <>
				{showCase === 1 &&
					<Line options={chartOptions} data={data({
						label: '# of Cases',
						labels: Object.keys(info.timeline.cases),
						data: Object.values(info.timeline.cases),
						rgb: '54, 162, 235'
					})} />
				}

				{showCase === 2 &&
					<Line options={chartOptions} data={data({
						label: '# of Deaths',
						labels: Object.keys(info.timeline.deaths),
						data: Object.values(info.timeline.deaths),
						rgb: '255, 99, 132'
					})} />
				}

				{showCase === 3 &&
					<Line options={chartOptions} data={data({
						label: '# of Recovered',
						labels: Object.keys(info.timeline.recovered),
						data: Object.values(info.timeline.recovered),
						rgb: '75, 192, 192'
					})} />
				}
			</>}

			{chartType === 2 && <>
				{showCase === 1 &&
				<Bar options={chartOptions} data={data({
					label: '# of Cases',
					labels: Object.keys(info.perDay.cases),
					data: Object.values(info.perDay.cases),
					rgb: '54, 162, 235'
				})} />
				}

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
			</>}

		</div>
	);
};

Statistics.propTypes = {
	info: PropTypes.object
};

export default Statistics;