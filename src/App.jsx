import ReactDOM from 'react-dom';
import React, { useReducer } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import { routes } from '@/routes.js';

import {
	initialState,
	reducer
} from '@redux/reducers';

import Context from '@redux/store';

const App = () => {
	const [store, dispatch] = useReducer(reducer, initialState);

	return (
		<Context.Provider value={{ store, dispatch }}>
			<Router basename="/">
				<Switch>
					{routes.map((route, i) => {
						return <Route key={i} exact={route.exact} path={route.path ? route.path : null} component={route.component} />
					})}
				</Switch>
			</Router>
		</Context.Provider>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
serviceWorker.register();
