import {
	SET_TOTAL_DATA,
	SET_TODAY_LIST,
	SET_TODAY_SELECTED,
} from '@redux/constants/action-types';

export function totalDataAction(payload) {
	return { type: SET_TOTAL_DATA, payload };
}

export function todayListAction(payload) {
	return { type: SET_TODAY_LIST, payload };
}

export function todaySelectedAction(payload) {
	return { type: SET_TODAY_SELECTED, payload };
}
