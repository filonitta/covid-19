import React, { useEffect, useContext, useState } from 'react';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';

import api from '@/services/api.class';
import ErorMessage from '@shared/ErorMessage';
import Context from '@redux/store';
import { totalDataAction } from '@redux/actions';

const Total = () => {
	const { store, dispatch } = useContext(Context);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		async function fetchData() {
			const data = await api.getTotalInfo().catch(setErrorMessage);
			data && dispatch( totalDataAction(data) );
		}

		fetchData();
	}, [dispatch]);

	const { total: { data } } = store;

	if (errorMessage) return <ErorMessage />;
	if (!data) return <Spinner className="loader" animation="border" variant="primary" />;

	return (
		<div className="card bg-light">
			<div className="card-header">
				<h4 className="mb-0">Total statistics</h4>
			</div>
			<div className="card-body">
				<div className="row">
					<div className="col-xs-12 col-sm-6">
						<dl className="mb-0">
							<dt>Cases</dt><dd><span className="badge badge-secondary">{data.cases.toLocaleString(navigator.language)}</span></dd>
							<dt>Deaths</dt><dd><span className="badge badge-secondary">{data.deaths.toLocaleString(navigator.language)}</span></dd>
							<dt>Recovered</dt><dd><span className="badge badge-secondary">{data.recovered.toLocaleString(navigator.language)}</span></dd>
							<dt>Active</dt><dd><span className="badge badge-secondary">{data.active.toLocaleString(navigator.language)}</span></dd>
							<dt>Critical</dt><dd><span className="badge badge-secondary">{data.critical.toLocaleString(navigator.language)}</span></dd>
						</dl>
					</div>
					<div className="col-xs-12 col-sm-6">
						<dl className="mb-0">
							<dt>Population</dt><dd><span className="badge badge-secondary">{data.population.toLocaleString(navigator.language)}</span></dd>
							<dt>Affected Countries</dt><dd><span className="badge badge-secondary">{data.affectedCountries.toLocaleString(navigator.language)}</span></dd>
							<dt>Tests</dt><dd><span className="badge badge-secondary">{data.tests.toLocaleString(navigator.language)}</span></dd>
						</dl>
					</div>
				</div>
			</div>
			<div className="card-footer">
				<span className="badge">Date updated: {moment(data.updated).format('MMM DD, YYYY hh:MM a')}</span>
			</div>
		</div>
	);
};

Total.propTypes = {};

export default Total;