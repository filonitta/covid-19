import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDownAlt } from '@fortawesome/free-solid-svg-icons';

import { arraysEqual } from '@utils/array';

const Sorting = (props) => {
	const {
		list,
		onChange,
		sortField
	} = props;

	const [currentSortField, setCurrentSortField] = useState(sortField);
	const [currentList, setCurrentList] = useState(list);

	useEffect(() => {
		setCurrentList(list);
	}, [list]);

	useEffect(() => {
		if (list.length && (currentSortField !== sortField || !arraysEqual(list, currentList))) {
			// console.log({ list, currentList })
			onSortHandler();
		}
	}, [onSortHandler, currentSortField, onGetSortedHandler, list, sortField, currentList]);

	const onSortHandler = useCallback(() => {
		onChange(onGetSortedHandler(), currentSortField);
	}, [onChange, onGetSortedHandler, currentSortField]);

	const onGetSortedHandler = useCallback(() => {
		let sorted = [];

		if (currentSortField === 'country') {
			sorted = list.sort((a, b) => b[currentSortField] > a[currentSortField] ? -1 : b[currentSortField] < a[currentSortField] ? 1 : 0);
		} else {
			const items = Object.keys(list[0].timeline[currentSortField]);
			const lastDate = items[items.length - 1];

			sorted = list.sort((a, b) => b.timeline[currentSortField][lastDate] - a.timeline[currentSortField][lastDate]);
		}

		return sorted;
	}, [list, currentSortField]);

	const handleChange = event => {
		const value = event.target.value;
		setCurrentSortField(value);
	};

	return (
		<div className="form-group">
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<span className="input-group-text"><FontAwesomeIcon icon={faSortAmountDownAlt} /></span>
				</div>
				<select className="form-control" onChange={handleChange} placeholder="Sort by" defaultValue={currentSortField}>
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
	onChange: PropTypes.func,
	sortField: PropTypes.string
};

export default Sorting;