import React, { useEffect, useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'react-datepicker/dist/react-datepicker.css';

import Statistics from './Statistics';
import Context from '@redux/store';
import { allListAction } from '@redux/actions';
import { aggregateByCountryName } from '@utils/countries';
import ErorMessage from '@shared/ErorMessage';
import useApi from '@/services/api';

String.prototype.capitalize = function () {
	const value = this.valueOf();
	return `${value.substring(0, 1).toUpperCase()}${value.substring(1)}`;
};

const HistoricalCountries = () => {
	const { store, dispatch } = useContext(Context);

	const {
		all: { list: countries }
	} = store;

	const {
		data: info,
		isError,
		errorMessage,
	} = useApi('historical?lastdays=0', []);

	useEffect(() => {
		if (!info.length) return;
		const data = aggregateByCountryName(info);
		dispatch(allListAction(data));
	}, [dispatch, info]);

	if (isError) return <ErorMessage message={errorMessage} />;

	return (
		<>
			{!countries.length ? <Spinner className="loader" animation="border" variant="primary" /> : (
				<div className="card card-body bg-light statistics">
					<Statistics list={countries} />
				</div>
			)}
		</>
	)
};

export default HistoricalCountries;