import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchField = (props) => {
	const {
		list,
		onSearch,
		initialValue,
	} = props;

	const [currentValue, setCurrentValue] = useState('');
	const [originalList, setOriginalList] = useState([]);
	
	useEffect(() => {
		!originalList.length && setOriginalList(list);
	}, [originalList, list]);
	
	useEffect(() => {
		if (currentValue !== initialValue) {
			setOriginalList(list);

			onSearch(list.filter(item => item.country.toLowerCase().startsWith(currentValue)), currentValue);
		}
	}, [list, originalList, currentValue, initialValue, onSearch]);

	/* const onSearchHandler = useCallback(() => {
		return originalList.filter(item => item.country.toLowerCase().startsWith(currentValue));
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
	initialValue: PropTypes.string,
};

export default SearchField;