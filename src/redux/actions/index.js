import * as types from '@redux/constants/action-types';

export const totalDataAction = (payload) => ({ type: types.SET_TOTAL_DATA, payload });
export const todayListAction = (payload) => ({ type: types.SET_TODAY_LIST, payload });
export const todaySelectedAction = (payload) => ({ type: types.SET_TODAY_SELECTED, payload });
export const allListAction = (payload) => ({ type: types.SET_ALL_LIST, payload });
export const allMetaAction = (payload) => ({ type: types.SET_ALL_META, payload }); 
export const dayListAction = (payload) => ({ type: types.SET_DAY_LIST, payload }); 
export const dayMetaAction = (payload) => ({ type: types.SET_DAY_META, payload }); 
export const daySelectedAction = (payload) => ({ type: types.SET_DAY_SELECTED, payload });
