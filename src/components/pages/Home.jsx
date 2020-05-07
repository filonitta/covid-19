import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './Home.scss';
import Total from '@base/src/components/Total';
import Today from '@base/src/components/Today';
import HistoricalPerDay from '@base/src/components/HistoricalPerDay';
import HistoricalCountries from '@base/src/components/HistoricalCountries';

const Home = () => {
	const [activeTab, setActiveTab] = useState('total');

	const onSelectTab = tab => {
		setActiveTab(tab);
	}

	return <>
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


	</>
}

export default Home;