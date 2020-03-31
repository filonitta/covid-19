import React from 'react';
// import PropTypes from 'prop-types';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './Home.scss';
import Total from '@base/src/components/Total';
import HistoricalPerDay from '@base/src/components/per-day';
import HistoricalPerCountry from '@base/src/components/per-country';

const Home = () => {
	return (
		<div className="container">
			<div className="page-header mt-5 mb-5">
				<h1>COVID-19 statistics</h1>
			</div>

			<Tabs defaultActiveKey="country" id="uncontrolled-tab-example">
				<Tab eventKey="total" title="Total">
					<Total />
				</Tab>
				<Tab eventKey="country" title="Historical per country">
					<HistoricalPerCountry />
				</Tab>
				<Tab eventKey="day" title="Historical per day">
					<HistoricalPerDay />
				</Tab>
				{/* <Tab eventKey="contact" title="Contact" disabled>
					hello 3
				</Tab> */}
			</Tabs>

								
		</div>
	)
}

export default Home;