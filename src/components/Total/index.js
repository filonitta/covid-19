import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import api from '@/services/api.class';
import NoData from '@shared/NoData';

const Total = (props) => {
	const [data, setData] = useState(null);

	useEffect(() => {
		async function fetchData() {
			const data = await api.getTotalInfo();
			setData(data);
		}

		fetchData();
	}, {});

	if (!data) return <NoData />;

	return (
		<div className="card bg-light">
			<div className="card-header">
				<h4 className="mb-0">Total statistics</h4>
			</div>
			<div className="card-body">
				<dl>
					<dt>Cases</dt><dd><span className="badge badge-secondary">{data.cases.toLocaleString(navigator.language)}</span></dd>
					<dt>Deaths</dt><dd><span className="badge badge-secondary">{data.deaths.toLocaleString(navigator.language)}</span></dd>
					<dt>Recovered</dt><dd><span className="badge badge-secondary">{data.recovered.toLocaleString(navigator.language)}</span></dd>
					<dt>Active</dt><dd><span className="badge badge-secondary">{data.active.toLocaleString(navigator.language)}</span></dd>
				</dl>
			</div>
			<div className="card-footer">
				<span className="badge">Date updated: {moment(data.updated).format('MMM DD, YYYY hh:MM a')}</span>
			</div>
		</div>
	);
};

Total.propTypes = {
};

export default Total;