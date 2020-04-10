import * as types from '@redux/constants/action-types';

export const initialState = {
	total: {
		data: null,
	},
	today: {
		list: [],
		selectedItem: null
	},
	all: {
		list: [],
		meta: {
			colors: [],
			selectedDate: null
		}
	}
}

export const reducer = (state, action) => {
	switch (action.type) {
		case types.SET_TOTAL_DATA: return Object.assign({}, state, { total: { data: { ...action.payload } } });
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
		case types.SET_ALL_LIST: {
			let { all } = state;
			all.list = [...action.payload];
			return Object.assign({}, state, all);
		}
		case types.SET_ALL_META: {
			let { all } = state;
			all.meta = { ...all.meta, ...action.payload };
			console.log(all.meta)
			return Object.assign({}, state, all);
		}
		default: return state;
	}
}