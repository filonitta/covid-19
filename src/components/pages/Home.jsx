import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './Home.scss';
import Total from '@base/src/components/Total';
import Today from '@base/src/components/Today';
import HistoricalPerDay from '@base/src/components/HistoricalPerDay';
import HistoricalCountries from '@base/src/components/HistoricalCountries';

const Home = () => {
	const [activeTab, setActiveTab] = useState('day');

	const onSelectTab = tab => {
		setActiveTab(tab);
	}

	return (
		<div className="container">
			<div className="page-header mt-4 mb-5">
				<h1>COVID-19 statistics</h1>
			</div>

			<Tabs defaultActiveKey={activeTab} onSelect={onSelectTab} variant="pills">
				<Tab eventKey="total" title="Total" disabled={activeTab === 'total'} unmountOnExit>
					<Total />
				</Tab>
				<Tab eventKey="today" title="Today" disabled={activeTab === 'today'} unmountOnExit>
					<Today />
				</Tab>
				<Tab eventKey="all" title="Historical: all countries" disabled={activeTab === 'all'} unmountOnExit>
					<HistoricalCountries />
				</Tab>
				<Tab eventKey="day" title="Historical: per day" disabled={activeTab === 'day'} unmountOnExit>
					<HistoricalPerDay />
				</Tab>
			</Tabs>

			<footer className="bg-light p-2 text-right mt-5">
				<small>Used public API: <a href="https://corona.lmao.ninja" target="_blank" rel="noopener noreferrer">https://corona.lmao.ninja</a></small>
			</footer>								
		</div>
	)
}

export default Home;