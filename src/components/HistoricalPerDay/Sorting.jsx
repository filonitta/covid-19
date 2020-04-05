import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';

const Sorting = (props) => {
	const {
		list,
		onSort
	} = props;

	const sort = event => {
		const value = event.target.value;
		
		if (value === 'country') {
			const sorted = list.sort((a, b) => b[value] > a[value] ? -1 : b[value] < a[value] ? 1 : 0);
			onSort(sorted);
		} else {
			const items = Object.keys(list[0].timeline[value]);
			const lastDate = items[items.length - 1];
	
			const sorted = list.sort((a, b) => b.timeline[value][lastDate] - a.timeline[value][lastDate]);
			onSort(sorted);
		}

	}

	return (
		<div className="form-group">
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					{/* <button className="btn btn-secondary" type="button"><FontAwesomeIcon icon={faSortAmountUpAlt} /></button> */}
					<span className="input-group-text"><FontAwesomeIcon icon={faSortAmountDownAlt} /></span>
				</div>
				<select className="form-control" onChange={sort} placeholder="Sort by">
					{/* <option value="DEFAULT" disabled>-- Sort by --</option> */}
					<option value="country">Country name</option>
					<option value="cases">Cases</option>
					<option value="deaths">Deaths</option>
					<option value="recovered">Recovered</option>
				</select>
			</div>
		</div>
	);
};

Sorting.propTypes = {
	list: PropTypes.array,
	onSort: PropTypes.func
};

export default Sorting;