import * as types from '@redux/constants/action-types';

export const initialState = {
	totalData: null,
	today: {
		list: [],
		selectedItem: null
	},
}

export const reducer = (state, action) => {
	switch (action.type) {
		case types.SET_TOTAL_DATA: return Object.assign({}, state, { totalData: { ...action.payload } });
		case types.SET_TODAY_LIST: {
			let { today } = state;
			today.list = [...action.payload];
			return Object.assign({}, state, today);
		}
		case types.SET_TODAY_SELECTED: {
			let { today } = state;
			today.selectedItem = {...action.payload};
			return Object.assign({}, state, today);
		}
		default: return state;
	}
}