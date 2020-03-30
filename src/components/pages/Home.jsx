import React from 'react';
// import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './Home.scss';
import Historical from '@base/src/components/historical/Historical';

const Home = () => {
	return (
		<div className="container">
			<div className="page-header mt-5 mb-5">
				<h1>COVID-19 statistics</h1>
			</div>

			<Tabs defaultActiveKey="historical" id="uncontrolled-tab-example">
				<Tab eventKey="total" title="Total" disabled>
					No data
				</Tab>
				<Tab eventKey="historical" title="Historical">
					<Historical />
				</Tab>
				{/* <Tab eventKey="contact" title="Contact" disabled>
					hello 3
				</Tab> */}
			</Tabs>

								
		</div>
	)
}

export default Home;