import {
	ADD_NOTIFICATION,
	DELETE_NOTIFICATION
} from '@redux/constants/action-types';

export function addNotification(payload) {
	return { type: ADD_NOTIFICATION, payload };
}

export function deleteNotification(payload) {
	return { type: DELETE_NOTIFICATION, payload };
}