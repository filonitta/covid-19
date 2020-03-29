import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Notification from './../shared/Notification';

const styles = {
	
};

class Home extends React.Component {
	static propTypes = {
		classes: PropTypes.object
	};

	render() {
		return <div className="container">
			<h1>Homepage</h1>
			<p>Hi there!</p>

			<Notification />
		</div>;
	}
}

export default withStyles(styles)(Home);