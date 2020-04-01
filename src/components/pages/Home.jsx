import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './Home.scss';
import Total from '@base/src/components/Total';
import Today from '@base/src/components/Today';
import HistoricalPerDay from '@base/src/components/per-day';
import HistoricalPerCountry from '@base/src/components/per-country';

const Home = () => {
	const [activeTab, setActiveTab] = useState('total');
	const [visitedTabs, setVisitedTabs] = useState([activeTab]);

	const onSelectTab = tab => {
		setActiveTab(tab);
		if (!isVisited(tab)) setVisitedTabs([...visitedTabs, tab]);
	}

	const isVisited = (tab) => visitedTabs.includes(tab);

	return (
		<div className="container">
			<div className="page-header mt-5 mb-5">
				<h1>COVID-19 statistics</h1>
			</div>

			<Tabs defaultActiveKey={activeTab} onSelect={onSelectTab}>
				<Tab eventKey="total" title="Total" disabled={activeTab === 'total'}>
					{(activeTab === 'total' || isVisited('total')) && <Total />}
				</Tab>
				<Tab eventKey="today" title="Today" disabled={activeTab === 'today'}>
					{(activeTab === 'today' || isVisited('today')) && <Today />}
				</Tab>
				<Tab eventKey="all" title="Historical: all countries" disabled={activeTab === 'all'}>
					{(activeTab === 'all' || isVisited('all')) && <HistoricalPerCountry />}
				</Tab>
				<Tab eventKey="country" title="Historical: per country" disabled={activeTab === 'country'}>
					{(activeTab === 'country' || isVisited('country')) && <HistoricalPerDay />}
				</Tab>
			</Tabs>

								
		</div>
	)
}

export default Home;