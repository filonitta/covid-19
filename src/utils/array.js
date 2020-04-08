export const arraysEqual = (arr1, arr2) => {
	if (arr1.length !== arr2.length) return false;

	return JSON.stringify(arr1) === JSON.stringify(arr2);
};