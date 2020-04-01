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
		<div className="card">
			<div className="card-header">
				<h4>Total statistics</h4>
			</div>
			<div className="card-body">
				<dl>
					<dt>Cases</dt><dd><span className="badge badge-secondary">{data.cases.toLocaleString('ru')}</span></dd>
					<dt>Deaths</dt><dd><span className="badge badge-secondary">{data.deaths.toLocaleString('ru')}</span></dd>
					<dt>Recovered</dt><dd><span className="badge badge-secondary">{data.recovered.toLocaleString('ru')}</span></dd>
					<dt>Active</dt><dd><span className="badge badge-secondary">{data.active.toLocaleString('ru')}</span></dd>
				</dl>
			</div>
			<div className="card-footer">
				<span className="badge badge-light">Date updated: {moment(data.updated).format('MM-DD-YYYY')}</span>
			</div>
		</div>
	);
};

Total.propTypes = {
};

export default Total;