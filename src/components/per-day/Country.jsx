import React from 'react';
import PropTypes from 'prop-types';

const Country = (props) => {
	const {
		name,
		province,
		onSelectCountry
	} = props;

	return (
		<a href="" className="list-group-item list-group-item-action" onClick={onSelectCountry}>{name} {province && `(${province})`}</a>
	);
};

Country.propTypes = {
	name: PropTypes.string.isRequired,
	province: PropTypes.string,
	onSelectCountry: PropTypes.func
}

export default Country;