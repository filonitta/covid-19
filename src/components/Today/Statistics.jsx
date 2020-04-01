import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
					<img src={info.countryInfo.flag} style={{ position: 'absolute', right: '1.25rem' }} alt=""/>
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
			<div className="card-footer">
				<span className="badge">Date updated: {moment(info.updated).format('MM-DD-YYYY')}</span>
			</div>
		</div>
	);
};

Statistics.propTypes = {
	info: PropTypes.object
};

export default Statistics;