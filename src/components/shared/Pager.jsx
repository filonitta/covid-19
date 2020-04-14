import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

import './Pager.scss';
import { range } from '@utils/math';

const Pager = (props) => {
	const {
		onPageChange,
		onPageSizeChange,
		pageSize,
		totalPages,
		totalRecords,
		startPage
	} = props;

	const initialCenter = Math.ceil(totalPages / 2);
	const pagesCount = Math.ceil(totalRecords / pageSize);
	const [currentPage, setCurrentPage] = useState(startPage);
	const [currentIndex, setCurrentIndex] = useState(1);
	let [currentCenter, setCurrentCenter] = useState(initialCenter);
	
	const onClick = page => () => {
		if (page <= initialCenter) {
			setCurrentIndex(1);
			setCurrentCenter(initialCenter);
		} else {
			setCurrentIndex(currentIndex + (page - currentCenter));
			setCurrentCenter(page);
		}
		
		onPageChange(page);
		setCurrentPage(page);
	}

	const generatePaginationItems = () => {
		const pages = range(pagesCount, 1);
		const theEndIsReached = pagesCount - (totalPages + currentIndex - 1) < 0;

		const index = {
			start: theEndIsReached ? pagesCount - totalPages : currentIndex - 1,
			end: totalPages + currentIndex - 1
		};

		return pages.slice(index.start, index.end).map((value, index) => (
			<Pagination.Item
				key={index}
				active={currentPage === value}
				onClick={onClick(value)}>
				{value}
			</Pagination.Item>
		));
	}

	const onChangePaginationCount = (event) => {
		onPageSizeChange(+event.target.value);
		onPageChange(startPage);
		setCurrentPage(startPage);
		setCurrentIndex(startPage);
		setCurrentCenter(initialCenter);
	}

	return (
		<div className="pagination-controls">
			<select
				className="form-control"
				style={{ width: '100px' }}
				onChange={onChangePaginationCount}
				defaultValue={'20'}
			>
				<option value="10">10</option>
				<option value="20">20</option>
				<option value="30">30</option>
			</select>
			
			<Pagination className="mt-2 mt-md-0">
				<Pagination.First onClick={onClick(1)} disabled={currentCenter <= initialCenter} />
				<Pagination.Prev onClick={onClick(currentPage - 1)} disabled={currentPage === 1} />
				{currentCenter > initialCenter && <Pagination.Ellipsis disabled />}

				{generatePaginationItems()}

				{(pagesCount - currentPage >= initialCenter) && pagesCount !== totalPages && <Pagination.Ellipsis disabled />}
				<Pagination.Next onClick={onClick(currentPage + 1)} disabled={currentPage === pagesCount} />
				<Pagination.Last onClick={onClick(pagesCount)} disabled={(pagesCount - currentPage < initialCenter) || pagesCount === totalPages} />
			</Pagination>
		</div>
	);
};

Pager.propTypes = {
	onPageSizeChange: PropTypes.func,
	onPageChange: PropTypes.func,
	pageSize: PropTypes.number,
	totalPages: PropTypes.number,
	totalRecords: PropTypes.number,
	startPage: PropTypes.number,
};

Pager.defaultProps = {
	totalPages: 10,
	startPage: 1
};

export default Pager;