import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

const Period = (props) => {
	const {
		list,
		onChange
	} = props;

	const handleChange = event => {
		onChange(+event.target.value);
	}

	return (
		<div className="form-group">
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text"><FontAwesomeIcon icon={faHistory} /></span>
				</div>
				<select className="form-control" onChange={handleChange} placeholder="Period" defaultValue={'1'}>
					<option value="30">Last 30 days</option>
					<option value="60">Last 60 days</option>
					<option value="360">All</option>
				</select>
			</div>
		</div>
	);
};

Period.propTypes = {
	list: PropTypes.array,
	onChange: PropTypes.func
};

export default Period;