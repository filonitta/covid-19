import {
	SET_TOTAL_DATA,
} from '@redux/constants/action-types';

export const initialState = {
	totalData: null,
}

export const reducer = (state, action) => {
	switch (action.type) {
		case SET_TOTAL_DATA: return Object.assign({}, state, { totalData: { ...action.payload } });
		default: return state;
	}
}