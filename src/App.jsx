import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';

import store from '@redux/store/index';
import { routes } from '@/routes.js';

global.store = store;

class App extends React.Component {
	componentDidMount() {
	}

	componentWillUnmount() {}

	render() {
		return (
			<Router basename="/">
				<Switch>
				{routes.map((route, i) => {
					return <Route key={i} exact={route.exact} path={route.path ? route.path : null} component={route.component} />
				})}
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(<Provider store={store}>
		<App />
	</Provider>,
document.getElementById('app'));