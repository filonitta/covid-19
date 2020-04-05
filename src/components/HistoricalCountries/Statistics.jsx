import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';

defaults.global.legend.display = false;
defaults.global.tooltips.titleMarginBottom = 15;
defaults.global.tooltips.footerMarginTop = 10;

import './Statistics.scss';
import RadioGroup from '@shared/RadioGroup';
import Pager from '@shared/Pager';
import { rnd } from '@utils/math';
import { format } from '@utils/date';

const Statistics = props => {
	const {
		list,
		selectedDate,
	} = props;

	const [showCase, setShowCase] = useState(1);
	const [paginationPage, setPaginationPage] = useState(1);
	const [paginationCount, setPaginationCount] = useState(20);

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

	const data = (list, field) => {
		list = list.sort((a, b) => b.timeline[field][selectedDate] - a.timeline[field][selectedDate]).slice(paginationPage !== 1 ? paginationPage * paginationCount - paginationCount : 0, paginationPage * paginationCount);

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
		const colors = range(list.length, () => `${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}`);

		return {
			cases: list.map(item => item.timeline.cases[selectedDate]),
			deaths: list.map(item => item.timeline.deaths[selectedDate]),
			countries: list.map(item => item.country + `${item.province ? ' (' + item.province + ')' : ''}`),
			labels: list.map(item => item.country + `${item.province ? ' (' + item.province + ')' : ''}`).map(item => item.length > 10 ? `${item.substring(0, 10)}...` : item),
			datasets: [{
				...settings,
				data: list.map(item => item.timeline[field][selectedDate]),
				backgroundColor: colors.map(value => `rgba(${value}, 0.5)`),
				hoverBackgroundColor: colors.map(value => `rgba(${value}, 0.7)`),
				// borderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointBorderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointHoverBackgroundColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
				// pointHoverBorderColor: range(list.length, () => `rgba(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)}, 1)`),
			}],
		};
	};

	// if (!list.length) return <NoData />;

	return (
		<div>
			<RadioGroup onChange={setShowCase} checkedValue={showCase} className="mt-4" />

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
	list: PropTypes.array,
	selectedDate: PropTypes.string,
};

export default Statistics;