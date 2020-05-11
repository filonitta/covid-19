import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
	const {
		onChange,
		value,
		label,
	} = props;

	const name = Math.random().toString(32).substring(2);

	return (
		<div className="custom-control custom-checkbox">
			<input type="checkbox" className="custom-control-input" id={name} onChange={onChange} value={value} checked={value} />
			<label className="custom-control-label" htmlFor={name}>{label}</label>
		</div>
	);
}

Checkbox.propTypes = {
	onChange: PropTypes.func.isRequired,
	value: PropTypes.any.isRequired,
	label: PropTypes.string.isRequired,
}

export default Checkbox;