import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { arraysEqual } from '@utils/array';

const SearchField = (props) => {
	const {
		list,
		onSearch,
		value: initialValue,
	} = props;

	// const [currentValue, setCurrentValue] = useState(initialValue);
	const [fullList, setFullList] = useState([]);
	const [isSet, setIsSet] = useState(false);
	const [isReset, setIsReset] = useState(false);
	const [isFiltered, setIsFiltered] = useState(false);

	const onFilter = event => {
		const value = event.target.value.toLowerCase();
		// setCurrentValue(value);
		onSearchHandler(value);
	};

	// - init full list
	useEffect(() => {
		if (list.length > fullList.length && !isSet) {
			console.log('0', list.length, fullList.length)
			console.info('-- init full list --');
			setFullList(list); // set fullList equal to list
			setIsSet(true);
			// setIsReset(true);
		}
	}, [list, fullList.length, isSet]);

	// filter on load
	useEffect(() => {
		if (initialValue && fullList.length && fullList.length === list.length) {
			console.log('1', list.length, fullList.length)
			console.log('-- filter on load --');
			onSearchHandler(initialValue); // filter list
		}
	}, [fullList, list, initialValue, onSearchHandler]);

	// filter on next list update
	useEffect(() => {
		console.log('2', isSet, list.length, fullList.length)
		if (isSet && fullList.length && list.length === fullList.length) {
			console.info('-- filter on next list update --');
			setFullList(list);
			setIsReset(true);
			// onSearchHandler(currentValue); // filter list
		}
	}, [list, fullList.length, onSearchHandler, isSet]);

	const onSearchHandler = useCallback((value) => {
		onSearch(fullList.filter(item => item.country.toLowerCase().startsWith(value)), value);
		setIsFiltered(true);
	}, [fullList, onSearch]);

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
				onInput={onFilter}
				defaultValue={initialValue}
				ref={input => input && input.addEventListener('search', onFilter)}
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