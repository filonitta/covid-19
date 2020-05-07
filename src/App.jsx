import ReactDOM from 'react-dom';
import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Offline, Online } from 'react-detect-offline';

import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import { routes } from '@/routes.js';
import Container from '@/components/pages/Container';

import {
	initialState,
	reducer
} from '@redux/reducers';

import Context from '@redux/store';

const App = () => {
	const [store, dispatch] = useReducer(reducer, initialState);

	return <>
		<Container>
			{/* <Online> */}
				<Context.Provider value={{ store, dispatch }}>
					<Router basename="/">
						<Switch>
							{routes.map((route, i) => {
								return <Route key={i} exact={route.exact} path={route.path ? route.path : null} component={route.component} />
							})}
						</Switch>
					</Router>
				</Context.Provider>
			{/* </Online> */}
			{/* <Offline>
				<div className="card bg-light">
					<div className="card-body">
						You are currently offline!
					</div>
				</div>
			</Offline> */}
		</Container>
	</>;
};

ReactDOM.render(<App />, document.getElementById('app'));
serviceWorker.register();
