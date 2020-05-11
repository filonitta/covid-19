import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Datepicker = props => {
	const {
		value,
		onChange,
		format,
		minDate,
		maxDate,
	} = props;

	return (
		<div className="input-group">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<FontAwesomeIcon icon={faCalendarAlt} />
				</span>
			</div>
			<DatePicker
				selected={value}
				onChange={onChange}
				maxDate={maxDate}
				minDate={minDate}
				dateFormat={format}
				isClearable={false}
				className="form-control"
			/>
		</div>
	);
}

Datepicker.propTypes = {
	value: PropTypes.instanceOf(Date),
	onChange: PropTypes.func,
	format: PropTypes.string,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
};

Datepicker.defaultProps = {
	format: 'MM-dd-yyyy',
};

export default Datepicker;