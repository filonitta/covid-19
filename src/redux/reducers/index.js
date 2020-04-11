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
			selectedDate: null,
			paginationCount: 20,
			showCase: 1,
			paginationPage: 1
		}
	},
	day: {
		list: [],
		selectedItem: null,
		meta: {
			period: 30,
			sortField: 'country',
			searchValue: ''
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
			return Object.assign({}, state);
		}
		case types.SET_ALL_META: {
			let { all } = state;
			all.meta = { ...all.meta, ...action.payload };
			return Object.assign({}, state);
		}
		case types.SET_DAY_LIST: {
			let { day } = state;
			day.list = [...action.payload];
			return Object.assign({}, state);
		}
		case types.SET_DAY_SELECTED: {
			let { day } = state;
			day.selectedItem = { ...action.payload };
			return Object.assign({}, state, day);
		}
		case types.SET_DAY_META: {
			let { day } = state;
			day.meta = { ...day.meta, ...action.payload };
			return Object.assign({}, state);
		}
		default: return state;
	}
}