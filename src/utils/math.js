export const range = (count, callback) => new Array(count).fill(0).map($ => callback ? callback($) : $);