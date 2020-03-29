import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
	static propTypes = {
		classes: PropTypes.object
	};

	render() {
		return <div className="container">
			<div className="page-header">
				<h1>Homepage</h1>
			</div>
			
			<div className="card">
				<div className="card-header">
					Featured
				</div>
				<div className="card-body">
					<h5 className="card-title">Special title treatment</h5>
					<p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
					<a href="#" className="btn btn-primary">Go somewhere</a>
				</div>
			</div>
		</div>;
	}
}

export default Home;