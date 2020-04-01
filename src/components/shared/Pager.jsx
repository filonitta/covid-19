import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

import './Pager.scss';
import { range2, range } from '@utils/math';

const Pager = (props) => {
	const {
		setPaginationCount,
		setPage,
		paginationPage,
		paginationCount,
		maxVisibleItems,
		itemsCount,
		activePage
	} = props;

	const [currentIndex, setCurrentIndex] = useState(activePage);
	const [currentVisibleItems, setCurrentVisibleItems] = useState(maxVisibleItems);

	const onClick = page => () => {
		// console.log(page)
		// console.log(page, currentIndex)
		if (page + currentIndex > maxVisibleItems / 2) {
			setCurrentIndex(Math.round(page / 2));
			setCurrentVisibleItems(currentVisibleItems + maxVisibleItems);
		}
		setPage(page);
	}

	const generatePaginationItems = () => {
		const pages = range2(itemsCount);

		// console.log(activePage, maxVisibleItems)

		const slice = {
			from: currentIndex === 1 ? currentIndex - 1 : currentVisibleItems - maxVisibleItems,
			// to: currentIndex === 1 ? maxVisibleItems : maxVisibleItems * currentIndex - maxVisibleItems 
			to: currentIndex === 1 ? maxVisibleItems : maxVisibleItems * currentIndex - maxVisibleItems 
		};

		console.log(slice);
		console.log(pages);
		console.log(pages.slice(slice.from, slice.to));

		return pages.slice(slice.from, slice.to).map((item, index) => (
			<Pagination.Item
				key={index}
				active={activePage === index + currentIndex}
				onClick={onClick(index + currentIndex)}>
					{index + currentIndex}
			</Pagination.Item>
		));
	}

	return (
		<div className="pagination-controls">
			<select
				className="form-control"
				style={{ width: '100px' }}
				onChange={event => setPaginationCount(+event.target.value)}
				defaultValue={'20'}
			>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">40</option>
			</select>

			<Pagination>
				<Pagination.First onClick={onClick(1)} disabled={paginationPage === 1} />
				<Pagination.Prev onClick={onClick(paginationPage - 1)} disabled={paginationPage === 1} />

				{/* {generatePaginationItems()} */}

				{range(Math.ceil(itemsCount / paginationCount)).map((item, index) => (
					<Pagination.Item key={index} active={paginationPage === index + 1} onClick={setPage(index + 1)}>{index + 1}</Pagination.Item>
				))}

				<Pagination.Next onClick={onClick(paginationPage + 1)} disabled={paginationPage === Math.ceil(itemsCount / paginationCount)} />
				<Pagination.Last onClick={onClick(Math.ceil(itemsCount / paginationCount))} disabled={paginationPage === Math.ceil(itemsCount / paginationCount)} />
			</Pagination>
		</div>
	);
};

Pager.propTypes = {
	setPaginationCount: PropTypes.func,
	setPage: PropTypes.func,
	paginationPage: PropTypes.number,
	paginationCount: PropTypes.number,
	maxVisibleItems: PropTypes.number,
	
	itemsCount: PropTypes.number,
	activePage: PropTypes.number,
};

export default Pager;