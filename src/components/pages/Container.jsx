import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Container = props => {
	const [isShown, setIsShown] = useState(false);

	return (
		<div className="container">
			<div className="page-header mt-4 mb-3 mb-md-5">
				<h1>COVID-19 statistics</h1>
			</div>

			<div className="main-content">{props.children}</div>

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
	);
}

Container.propTypes = {
	children: PropTypes.node.isRequired
}

export default Container;