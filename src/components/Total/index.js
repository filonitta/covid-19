import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

import Context from '@redux/store';
import useApi from '@/services/api';
import { totalDataAction } from '@redux/actions';
import ErorMessage from '@shared/ErorMessage';

const Total = () => {
	const { store, dispatch } = useContext(Context);

	const {
		data: info,
		isError,
		errorMessage,
	} = useApi('all', null);

	useEffect(() => {
		info && dispatch( totalDataAction(info) );
	}, [dispatch, info]);
	
	const { total: { data } } = store;

	if (isError) return <ErorMessage message={errorMessage} />;
	if (!data) return <Spinner className="loader" animation="border" variant="primary" />;

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

Total.propTypes = {};

export default Total;