import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { deleteNotification } from '@redux/actions/index';

const variantIcon = {
	success: CheckCircleIcon,
	warning: WarningIcon,
	error: ErrorIcon,
	info: InfoIcon,
};

const styles = theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.dark,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	notificationContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexWrap: 'nowrap'
	},
	close: {
	}
});

class MySnackbarContent extends React.Component {
	constructor(props) {
		super(props);
	}

    render() {
		const { classes, className, message, onClose, variant, ...other } = this.props;
		const Icon = variantIcon[variant];

		return (
			<SnackbarContent
				className={classNames(classes[variant], className, classes.notificationContent)}
				styles={styles.notificationContent}
				aria-describedby="client-snackbar"
				message={
					<span id="client-snackbar" className={classes.message}>
						<Icon className={classNames(classes.icon, classes.iconVariant)} />
						{message}
					</span>
				}
				action={[
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.close}
						onClick={onClose}
					>
						<CloseIcon className={classes.icon} />
					</IconButton>,
				]}
				{...other}
			/>
		);
    }
}

MySnackbarContent.propTypes = {
	classes: PropTypes.object.isRequired,
	className: PropTypes.string,
	message: PropTypes.node,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

MySnackbarContent.defaultProps = {
	className: '',
	message: '',
	onClose: () => {},
	// variant: 'info',
};

const SnackbarContentWrapper = withStyles(styles)(MySnackbarContent);


const mapStateToProps = state => {
	return {
		notification: {
			show: state.notification.show || false,
			message: state.notification.message || '',
			type: state.notification.type || 'info'
		}
	};
};

class ConnectedNotification extends React.Component {
	static propTypes = {
		notification: PropTypes.shape({
			type: PropTypes.string,
			message: PropTypes.string,
			show: PropTypes.bool,
		}),
		duration: PropTypes.number
	}

	constructor(props) {
		super(props);
	}

	handleClose = () => {
		store.dispatch( deleteNotification() );
	}

	render() {
		return (
			<div>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					open={this.props.notification.show}
					autoHideDuration={this.props.duration || 10000}
					onClose={this.handleClose}
				>
					<SnackbarContentWrapper
						onClose={this.handleClose}
						variant={this.props.notification.type}
						message={this.props.notification.message}
					/>
				</Snackbar>
			</div>
		);
	}
}

const Notification = connect(mapStateToProps)(ConnectedNotification);

export default Notification;