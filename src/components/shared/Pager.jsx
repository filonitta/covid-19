import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

import './Pager.scss';
import { range } from '@utils/math';

const Pager = (props) => {
	const {
		setPaginationCount,
		setPage,
		paginationPage,
		paginationCount,
		paginationVisibleItems,
		list
	} = props;

	const generatePaginationItems = () => {
		const data = [];
		range(Math.ceil(list.length / paginationCount)).forEach((item, index) => {
			if (index < Math.round(paginationVisibleItems / 2) || index >= Math.ceil(list.length / paginationCount) - Math.round(paginationVisibleItems / 2)) {
				data.push({
					value: 1,
					index
				});
				return;
			}

			if (!data.find(item => item.value === 0)) data.push({
				value: 0,
				index
			});
		});

		return data.map((item, index) => item.value ? <Pagination.Item key={index} active={paginationPage === item.index + 1} onClick={setPage(item.index + 1)}>{item.index + 1}</Pagination.Item> : <Pagination.Ellipsis key={index} disabled />);
	}

	return (
		<div className="pagination-controls">
			<select
				className="form-control"
				style={{ width: '100px' }}
				onChange={event => setPaginationCount(event.target.value)}
				defaultValue={'20'}
			>
				<option value="20">20</option>
				<option value="30">30</option>
				<option value="40">40</option>
			</select>

			<Pagination>
				<Pagination.First onClick={setPage(1)} disabled={paginationPage === 1} />
				<Pagination.Prev onClick={setPage(paginationPage - 1)} disabled={paginationPage === 1} />

				{generatePaginationItems()}

				{/* {range(Math.ceil(list.length / paginationCount)).map((item, index) => (
					<Pagination.Item key={index} active={paginationPage === index + 1} onClick={setPage(index + 1)}>{index + 1}</Pagination.Item>
				))} */}

				<Pagination.Next onClick={setPage(paginationPage + 1)} disabled={paginationPage === Math.ceil(list.length / paginationCount)} />
				<Pagination.Last onClick={setPage(Math.ceil(list.length / paginationCount))} disabled={paginationPage === Math.ceil(list.length / paginationCount)} />
			</Pagination>
		</div>
	);
};

Pager.propTypes = {
	setPaginationCount: PropTypes.func,
	setPage: PropTypes.func,
	paginationPage: PropTypes.number,
	paginationCount: PropTypes.number,
	paginationVisibleItems: PropTypes.number,
	list: PropTypes.array
};

export default Pager;