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

	const [currentValue, setCurrentValue] = useState('');
	const [fullList, setFullList] = useState([]);
	const [currentList, setCurrentList] = useState(list);
	const [listIsChanged, setListIsChanged] = useState(false);

	useEffect(() => {
		// console.log('list[0]', list[0])
		setCurrentList(list);
	}, [list]);

	useEffect(() => {
		if (initialValue && fullList.length) {
			// console.log(initialValue)
			onSearchHandler(initialValue);
			setCurrentValue(initialValue);
		}
	}, [initialValue, onSearchHandler, fullList.length]);

	useEffect(() => {
		!currentValue && initialValue !== currentValue && setCurrentValue(initialValue);
	}, [initialValue, currentValue]);

	useEffect(() => {
		const shouldUpdate = list.length &&
							// currentValue &&
							// currentValue !== initialValue && 
							list.length === fullList.length && 
							// !arraysEqual(list, currentList) && 
							// !arraysEqual(fullList, currentList) && 
							!arraysEqual(fullList, list);

		/* console.log('shouldUpdate', (!!shouldUpdate).toString().toUpperCase())
		console.log(
			list.length,
			// currentValue,
			// currentValue !== initialValue,
			list.length === fullList.length,
			// !arraysEqual(list, currentList),
			// !arraysEqual(fullList, currentList), 
			!arraysEqual(fullList, list),
			[fullList[0], list[0] ]
		); */

		if (shouldUpdate) {
			// console.info('--- the original list was changed ---')
			setFullList(list);
			setListIsChanged(true);
		}
	}, [list, currentList, currentValue, onSearch, fullList, initialValue, onSearchHandler]);
	
	useEffect(() => {
		if (!fullList.length) {
			// console.info('-- set full list --');
			setFullList(list);
		} else if (listIsChanged) {
			onSearchHandler(currentValue);
			setListIsChanged(false);
		}
	}, [list, fullList, currentValue, listIsChanged, onSearchHandler]);

	useEffect(() => {
		const shouldUpdate = !currentValue &&
							initialValue &&
							fullList.length;
		
		if (shouldUpdate) {
			// console.info('-- filter if there is initial value --');
			onSearchHandler(initialValue);
			setCurrentValue(initialValue);
		}
	}, [initialValue, fullList, onSearchHandler, currentValue]);

	const onSearchHandler = useCallback((value) => {
		onSearch(fullList.filter(item => item.country.toLowerCase().startsWith(value)), value);
	}, [fullList, onSearch]);
	
	const onFilter = event => {
		const value = event.target.value.toLowerCase();
		setCurrentValue(value);

		onSearch(fullList.filter(item => item.country.toLowerCase().startsWith(value)), value);
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
				onInput={onFilter}
				defaultValue={currentValue}
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