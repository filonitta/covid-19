import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './RadioGroup.scss';

const RadioGroup = (props) => {
	const {
		checkedValue,
		onChange
	} = props;

	const name = Math.random().toString(32).substring(2);

	const onInputChange = event => onChange(+event.target.value);

	return (
		<div className="show-case-controls mt-4">
			<strong>Show:</strong>
			<div className="custom-control custom-radio">
				<input type="radio" className="custom-control-input" id={`${name}cases`} name={name} onChange={onInputChange} value={1} checked={checkedValue === 1} />
				<label className="custom-control-label" htmlFor={`${name}cases`}>Cases</label>
			</div>
			<div className="custom-control custom-radio">
				<input type="radio" className="custom-control-input" id={`${name}deaths`} name={name} onChange={onInputChange} value={2} checked={checkedValue === 2} />
				<label className="custom-control-label" htmlFor={`${name}deaths`}>Deaths</label>
			</div>

			<div className="custom-control custom-radio">
				<input type="radio" className="custom-control-input" id={`${name}recovered`} name={name} onChange={onInputChange} value={3} checked={checkedValue === 3} />
				<label className="custom-control-label" htmlFor={`${name}recovered`}>Recovered</label>
			</div>
		</div>
	);
};

RadioGroup.propTypes = {
	checkedValue: PropTypes.number,
	onChange: PropTypes.func,
};

export default RadioGroup;