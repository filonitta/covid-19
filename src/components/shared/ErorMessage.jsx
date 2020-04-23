import React from 'react';
import PropTypes from 'prop-types';

const ErorMessage = props => {
	const { message } = props;

	return (
		<div className="card card-body bg-light">
			<div className="text-center">{message}</div>
		</div>
	);
};

ErorMessage.defaultProps = {
	message: 'Something went wrong'
};

ErorMessage.propTypes = {
	message: PropTypes.string
};

export default ErorMessage;