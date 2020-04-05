import React from 'react';
import PropTypes from 'prop-types';

import './CountriesList.scss';
import Country from './Country';

const CountriesList = (props) => {
	const {
		list,
		onCountrySelect
	} = props;

	const onCountryClick = item => event => {
		event.preventDefault();

		onCountrySelect(item);
	}

	return (
		<div className="list-group countries-list">
			{list.map((item, i) => <Country key={i} onSelectCountry={onCountryClick(item)} name={item.country} province={item.province ? item.province : ''} />)}
		</div>
	);
};

CountriesList.propTypes = {
	list: PropTypes.array,
	onCountrySelect: PropTypes.func
}

export default CountriesList;