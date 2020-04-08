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
	const [visitedTabs, setVisitedTabs] = useState([activeTab]);

	const onSelectTab = tab => {
		setActiveTab(tab);
		if (!isVisited(tab)) setVisitedTabs([...visitedTabs, tab]);
	}

	const isVisited = (tab) => visitedTabs.includes(tab);

	return (
		<div className="container mb-4">
			<div className="page-header mt-4 mb-5">
				<h1>COVID-19 statistics</h1>
			</div>

			<Tabs defaultActiveKey={activeTab} onSelect={onSelectTab} variant="pills">
				<Tab eventKey="total" title="Total" disabled={activeTab === 'total'} unmountOnExit={false}>
					{(activeTab === 'total' || isVisited('total')) && <Total />}
				</Tab>
				<Tab eventKey="today" title="Today" disabled={activeTab === 'today'} unmountOnExit={false}>
					{(activeTab === 'today' || isVisited('today')) && <Today />}
				</Tab>
				<Tab eventKey="all" title="Historical: all countries" disabled={activeTab === 'all'} unmountOnExit={false}>
					{(activeTab === 'all' || isVisited('all')) && <HistoricalCountries />}
				</Tab>
				<Tab eventKey="day" title="Historical: per day" disabled={activeTab === 'day'} unmountOnExit={false}>
					{(activeTab === 'day' || isVisited('day')) && <HistoricalPerDay />}
				</Tab>
			</Tabs>

								
		</div>
	)
}

export default Home;