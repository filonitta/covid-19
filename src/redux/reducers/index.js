import * as types from '@redux/constants/action-types';

export const initialState = {
	total: {
		data: null,
	},
	today: {
		list: [],
		selectedItem: null,
		meta: {
			searchValue: ''
		}
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
			searchValue: '',
			selectedDate: null,
			showCase: 1,
			chartType: 1
		}
	}
}

export const reducer = (state, action) => {
	switch (action.type) {
		case types.SET_TOTAL_DATA: return Object.assign({}, state, { total: { data: { ...action.payload } } });
		case types.SET_TODAY_LIST: {
			let { today: data } = state;
			data.list = [...action.payload];
			return Object.assign({}, state);
		}
		case types.SET_TODAY_SELECTED: {
			let { today: data } = state;
			data.selectedItem = {...action.payload};
			return Object.assign({}, state);
		}
		case types.SET_ALL_LIST: {
			let { all: data } = state;
			data.list = [...action.payload];
			return Object.assign({}, state);
		}
		case types.SET_ALL_META: {
			let { all: data } = state;
			data.meta = { ...data.meta, ...action.payload };
			return Object.assign({}, state);
		}
		case types.SET_DAY_LIST: {
			let { day: data } = state;
			data.list = [...action.payload];
			// console.log(state)
			return Object.assign({}, state);
		}
		case types.SET_DAY_SELECTED: {
			let { day: data } = state;
			data.selectedItem = { ...action.payload };
			return Object.assign({}, state, data);
		}
		case types.SET_DAY_META: {
			let { day: data } = state;
			data.meta = { ...data.meta, ...action.payload };
			return Object.assign({}, state);
		}
		case types.SET_TODAY_META: {
			let { today: data } = state;
			data.meta = { ...data.meta, ...action.payload };
			return Object.assign({}, state);
		}
		default: return state;
	}
}