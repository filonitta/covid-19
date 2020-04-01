import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Line, Bar } from 'react-chartjs-2';

import './Statistics.scss';
import NoData from '@shared/NoData';

const Statistics = (props) => {
	const {
		info
	} = props;

	if (!Object.keys(info)) return <NoData />

	return (
		<div className="card card-body bg-light">
			<h2 className="mt-4 mb-4">
				{/* <img src={info.countryInfo.flag} style={{maxWidth: '75px', marginRight: '5px'}} alt=""/> */}
				{info.country}
				<img src={info.countryInfo.flag} style={{ position: 'absolute', right: '1.25rem' }} alt=""/>
			</h2>
			<dl>
				<dt>Total Cases</dt><dd><span className="badge badge-secondary">{info.cases}</span></dd>
				<dt>Today cases</dt><dd><span className="badge badge-secondary">{info.todayCases}</span></dd>
				<dt>Total Deaths</dt><dd><span className="badge badge-secondary">{info.todayDeaths}</span></dd>
				<dt>Today Deaths</dt><dd><span className="badge badge-secondary">{info.todayDeaths}</span></dd>
				<dt>Recovered</dt><dd><span className="badge badge-secondary">{info.recovered}</span></dd>
				<dt>Active</dt><dd><span className="badge badge-secondary">{info.active}</span></dd>
				<dt>Critical</dt><dd><span className="badge badge-secondary">{info.critical}</span></dd>
			</dl>
		</div>
	);
};

Statistics.propTypes = {
	info: PropTypes.object
};

export default Statistics;