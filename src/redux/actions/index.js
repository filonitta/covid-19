import {
	SET_TOTAL_DATA,
} from '@redux/constants/action-types';

export function setTotalData(payload) {
	return { type: SET_TOTAL_DATA, payload };
}
