String.prototype.capitalize = function () {
	const value = this.valueOf().split(' ');
	return value.map(str => `${str.substring(0, 1).toUpperCase()}${str.substring(1)}`).join(' ');
}