import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { arraysEqual } from '@utils/array';

const SearchField = (props) => {
	const {
		list,
		onChange,
		value: initialValue,
	} = props;

	const [currentValue, setCurrentValue] = useState(initialValue);
	const [fullList, setFullList] = useState([]);
	const [shouldFilter, setShouldFilter] = useState(false);

	useEffect(() => {
		return () => {
			setFullList([]);
		}
	}, []);

	useEffect(() => {
		if (list.length > fullList.length) {
			// console.info('-- set full list --');
			setFullList(list);
		}
	}, [fullList, list]);

	useEffect(() => {
		if (fullList.length && initialValue && fullList.length === list.length) {
			// console.info('-- filter on init --');
			onSearchHandler(initialValue);
		}
	}, [initialValue, fullList.length, list.length, onSearchHandler]);

	useEffect(() => {
		if ( list.length && fullList.length === list.length && !arraysEqual(fullList, list) ) {
			// console.info('-- update full list --');

			setFullList(list);
			setShouldFilter(true);
		}
	}, [fullList, list, currentValue, onSearchHandler]);

	useEffect(() => {
		if (shouldFilter && currentValue) {
			onSearchHandler(currentValue);
			setShouldFilter(false);
		}
	}, [shouldFilter, currentValue, onSearchHandler]);

	const onSearchHandler = useCallback((value) => {
		onChange(fullList.filter(item => item.country.toLowerCase().startsWith(value)), value);
	}, [fullList, onChange]);
	
	const onFilter = event => {
		const value = event.target.value.toLowerCase();
		setCurrentValue(value);
		onSearchHandler(value);
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
				defaultValue={initialValue}
				ref={input => input && input.addEventListener('search', onFilter)}
			/>
		</div>
	);
};

SearchField.propTypes = {
	list: PropTypes.array,
	onChange: PropTypes.func,
	value: PropTypes.string,
};

export default SearchField;