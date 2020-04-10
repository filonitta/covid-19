import React, { useEffect, useContext } from 'react';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

import api from '@/services/api.class';

import Context from '@redux/store';
import { totalDataAction } from '@redux/actions';

const Total = () => {
	const { store, dispatch } = useContext(Context);

	useEffect(() => {
		async function fetchData() {
			const data = await api.getTotalInfo();
			dispatch( totalDataAction(data) );
		}

		fetchData();
	}, [dispatch]);

	const { totalData } = store;

	if (!totalData) return <Spinner className="loader" animation="border" variant="primary" />;

	return (
		<div className="card bg-light">
			<div className="card-header">
				<h4 className="mb-0">Total statistics</h4>
			</div>
			<div className="card-body">
				<dl>
					<dt>Cases</dt><dd><span className="badge badge-secondary">{totalData.cases.toLocaleString(navigator.language)}</span></dd>
					<dt>Deaths</dt><dd><span className="badge badge-secondary">{totalData.deaths.toLocaleString(navigator.language)}</span></dd>
					<dt>Recovered</dt><dd><span className="badge badge-secondary">{totalData.recovered.toLocaleString(navigator.language)}</span></dd>
					<dt>Active</dt><dd><span className="badge badge-secondary">{totalData.active.toLocaleString(navigator.language)}</span></dd>
				</dl>
			</div>
			<div className="card-footer">
				<span className="badge">Date updated: {moment(totalData.updated).format('MMM DD, YYYY hh:MM a')}</span>
			</div>
		</div>
	);
};

Total.propTypes = {};

export default Total;