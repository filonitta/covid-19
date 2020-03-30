import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './CountriesList.scss';
import Country from './Country';

const CountriesList = (props) => {
	const {
		list,
	} = props;

	const onSelectCountry = item => event => {
		event.preventDefault();

		console.log(item);
	}

	return (
		<div className="list-group countries-list">
			{list.map((item, i) => <Country key={i} onSelectCountry={onSelectCountry(item)} name={item.country} province={item.province ? item.province : ''} />)}
		</div>
	);
};

CountriesList.propTypes = {
	list: PropTypes.array,
}

export default CountriesList;