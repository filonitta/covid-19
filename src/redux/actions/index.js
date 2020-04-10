import * as types from '@redux/constants/action-types';

export function totalDataAction(payload) {
	return { type: types.SET_TOTAL_DATA, payload };
}

export function todayListAction(payload) {
	return { type: types.SET_TODAY_LIST, payload };
}

export function todaySelectedAction(payload) {
	return { type: types.SET_TODAY_SELECTED, payload };
}

export function allListAction(payload) {
	return { type: types.SET_ALL_LIST, payload };
}

export const allMetaAction = (payload) => ({ type: types.SET_ALL_META, payload }); 
