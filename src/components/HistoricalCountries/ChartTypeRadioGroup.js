import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './ChartTypeRadioGroup.scss';

const ChartTypeRadioGroup = (props) => {
	const {
		checkedValue,
		onChange,
		className
	} = props;

	const name = Math.random().toString(32).substring(2);

	const onInputChange = event => onChange(event.target.value);

	return (
		<div className={classnames('show-group-controls', className)}>
			<strong>Type:</strong>
			<div className="custom-control custom-radio">
				<input type="radio" className="custom-control-input" id={`${name}bar`} name={name} onChange={onInputChange} value={'bar'} checked={checkedValue === 'bar'} />
				<label className="custom-control-label" htmlFor={`${name}bar`}>Bar</label>
			</div>
			<div className="custom-control custom-radio">
				<input type="radio" className="custom-control-input" id={`${name}pie`} name={name} onChange={onInputChange} value={'pie'} checked={checkedValue === 'pie'} />
				<label className="custom-control-label" htmlFor={`${name}pie`}>Pie</label>
			</div>
		</div>
	);
};

ChartTypeRadioGroup.propTypes = {
	checkedValue: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default ChartTypeRadioGroup;