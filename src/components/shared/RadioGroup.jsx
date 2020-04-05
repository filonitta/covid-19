import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './RadioGroup.scss';

const RadioGroup = (props) => {
	const {
		checkedValue,
		onChange,
		className
	} = props;

	const name = Math.random().toString(32).substring(2);

	const onInputChange = event => onChange(+event.target.value);

	return (
		<div className={classnames('show-case-controls', className)}>
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
	checkedValue: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default RadioGroup;