import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
	render() {
		return (
			<div className="card bg-light">
				<div className="card-header">
					<h4 className="mb-0">Page not found</h4>
				</div>
				<div className="card-body">
					Go back to <Link to="/">home page</Link>
				</div>
			</div>
		);
	}
}