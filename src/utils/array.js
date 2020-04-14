export const arraysEqual = (source1, source2) => {
	if (source1.length !== source2.length) return false;

	return JSON.stringify(source1) === JSON.stringify(source2);
};