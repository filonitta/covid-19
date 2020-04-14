export const aggregateByCountryName = (list) => {
	const countries = [];

	list.forEach((item, i, source) => {
		const country = item.country;

		if (countries.find(item => item.country === country)) return;

		const timeline = {
			cases: {},
			deaths: {},
			recovered: {}
		};

		const provinces = source.filter(item => item.country === country);

		const result = {
			country,
			timeline
		};

		provinces.forEach((province) => {
			const dates = Object.keys(province.timeline.cases);

			const values = Object.keys(timeline).reduce((values, field) => {
				values[field] = Object.values(province.timeline[field]);
				return values;
			}, {});

			dates.forEach((date, i) => {
				Object.keys(timeline).forEach(field => {
					result.timeline[field][date] = result.timeline[field][date] ? result.timeline[field][date] + values[field][i] : values[field][i];
				});
			});
		}, item);

		countries.push(result);

		/* { // test
			const testField = 'recovered';
			const dates = Object.keys(provinces[0].timeline.cases);
			const lastDate = dates[dates.length - 1];
			const value = provinces.reduce((value, item) => value + item.timeline[testField][lastDate], 0);
			console.log(value === result.timeline[testField][lastDate]);
		} */
	});

	return countries;
};