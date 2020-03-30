import React from 'react';
import PropTypes from 'prop-types';

String.prototype.capitalize = function () {
	const value = this.valueOf().split(' ');
	return value.map(str => `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`).join(' ');
}

const Country = (props) => {
	const {
		name,
		province,
		onSelectCountry
	} = props;

	return (
		<a href="" className="list-group-item list-group-item-action" onClick={onSelectCountry}>{name.capitalize()} {province && `(${province.capitalize()})`}</a>
	);
};

Country.propTypes = {
	name: PropTypes.string.isRequired,
	province: PropTypes.string,
	onSelectCountry: PropTypes.func
}

export default Country;