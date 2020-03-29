import {
	ADD_NOTIFICATION,
	DELETE_NOTIFICATION
} from '@redux/constants/action-types';

let initialState = {
	notification: {
		message: '',
		type: 'info',
		show: false
	},
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case ADD_NOTIFICATION: return Object.assign({}, state, { notification: {...action.payload, show: true }});
		case DELETE_NOTIFICATION: return Object.assign({}, state, { notification: {...state.notification, ...action.payload, show: false} });
	}

	return state;
}

export default rootReducer;