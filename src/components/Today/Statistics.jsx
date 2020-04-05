import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Statistics.scss';

import NoData from '@shared/NoData';

const Statistics = (props) => {
	const {
		info
	} = props;

	if (!Object.keys(info)) return <NoData />

	return (
		<div className="card bg-light">
			<div className="card-header">
				<h4 className="mb-0">{info.country}</h4>
			</div>
			<div className="card-body">
				<img className="country-flag" src={info.countryInfo.flag} alt=""/>
				<dl>
					<dt>Total Cases</dt><dd><span className="badge badge-secondary">{info.cases.toLocaleString(navigator.language)}</span></dd>
					<dt>Today Cases</dt><dd><span className="badge badge-secondary">{info.todayCases.toLocaleString(navigator.language)}</span></dd>
					<dt>Total Deaths</dt><dd><span className="badge badge-secondary">{info.deaths.toLocaleString(navigator.language)}</span></dd>
					<dt>Today Deaths</dt><dd><span className="badge badge-secondary">{info.todayDeaths.toLocaleString(navigator.language)}</span></dd>
					<dt>Recovered</dt><dd><span className="badge badge-secondary">{info.recovered.toLocaleString(navigator.language)}</span></dd>
					<dt>Active</dt><dd><span className="badge badge-secondary">{info.active.toLocaleString(navigator.language)}</span></dd>
					<dt>Critical</dt><dd><span className="badge badge-secondary">{info.critical.toLocaleString(navigator.language)}</span></dd>
				</dl>
			</div>
			<div className="card-footer">
				<span className="badge">Date updated: {moment(info.updated).format('MMM DD, YYYY hh:MM a')}</span>
			</div>
		</div>
	);
};

Statistics.propTypes = {
	info: PropTypes.object
};

export default Statistics;