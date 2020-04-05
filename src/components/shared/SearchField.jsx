import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
	onSearch: PropTypes.func
};

export default SearchField;