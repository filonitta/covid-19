import React, { useState } from 'react';

export const Online = props => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	window.addEventListener('online', () => setIsOnline(true));
	window.addEventListener('offline', () => setIsOnline(false));

	return isOnline ? props.children : null;
}

export const Offline = props => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	window.addEventListener('online', () => setIsOnline(true));
	window.addEventListener('offline', () => setIsOnline(false));

	return !isOnline ? props.children : null;
}