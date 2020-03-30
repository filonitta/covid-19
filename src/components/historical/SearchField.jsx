import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchField = (props) => {
	const {
		list,
		onSearch
	} = props;

	const filter = event => {
		const value = event.target.value.toLowerCase();
		onSearch(list.filter(item => item.country.toLowerCase().startsWith(value)) )
	}

	return (
		<div className="form-group">
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
	onSearch: PropTypes.func
};

export default SearchField;