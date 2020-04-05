import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchField = (props) => {
	const {
		list,
		onSearch,
		value,
	} = props;

	const [currentValue, setCurrentValue] = useState(value);
	const [originalList, setOriginalList] = useState([]);
	
	useEffect(() => {
		!originalList.length && setOriginalList(list);
		// if (originalList.length) {
		// 	console.log('list', list);
		// 	console.log('originalList', originalList);
		// }

		// console.log('currentValue', currentValue)
		// currentValue && onSearch(originalList.filter(item => item.country.toLowerCase().startsWith(currentValue)), currentValue);
	}, [originalList, list, currentValue]);
	
	/* useEffect(() => {
	}, [currentValue, originalList]); */

	const filter = event => {
		const value = event.target.value.toLowerCase();
		setCurrentValue(value);
		onSearch(originalList.filter(item => item.country.toLowerCase().startsWith(value)), value);
	}

	return (
		<div className="input-group mb-3">
			<div className="input-group-prepend">
				<span className="input-group-text">
					<FontAwesomeIcon icon={faSearch} />
				</span>
			</div>
			<input
				type="search"
				className="form-control"
				placeholder="Filter by country name"
				onInput={filter}
				ref={input => input && input.addEventListener('search', filter)}
			/>
		</div>
	);
};

SearchField.propTypes = {
	list: PropTypes.array,
	onSearch: PropTypes.func,
	value: PropTypes.string,
};

export default SearchField;