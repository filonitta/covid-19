import React, { useState } from 'react';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Home.scss';
import Total from '@base/src/components/Total';
import Today from '@base/src/components/Today';
import HistoricalPerDay from '@base/src/components/HistoricalPerDay';
import HistoricalCountries from '@base/src/components/HistoricalCountries';

const Home = () => {
	const [activeTab, setActiveTab] = useState('total');
	const [isShown, setIsShown] = useState(false);

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
				<Accordion>
					<div>
						<div>
							<Accordion.Toggle as="div" variant="link" eventKey="0" className="button" onClick={() => setIsShown(!isShown)}>
								<FontAwesomeIcon title={isShown ? 'Hide info' : 'Show info'} icon={faInfoCircle} />
							</Accordion.Toggle>
						</div>
						<Accordion.Collapse eventKey="0">
							<div>
								<div><small>Used public API: <a href="https://corona.lmao.ninja" target="_blank" rel="noopener noreferrer">https://corona.lmao.ninja</a></small></div>
								<div><small>Developed by: <a href="https://github.com/filonitta/covid-19" target="_blank" rel="noopener noreferrer">filonitta</a></small></div>
							</div>
						</Accordion.Collapse>
					</div>
				</Accordion>
				
				{/* <small>Used public API: <a href="https://corona.lmao.ninja" target="_blank" rel="noopener noreferrer">https://corona.lmao.ninja</a></small> */}
			</footer>								
		</div>
	)
}

export default Home;