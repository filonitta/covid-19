export const range = (count, callback) => new Array(count).fill(0).map($ => callback ? callback($) : $);
export const range2 = (count) => new Array(count).fill(0).map(($, i) => i);
export const rnd = (min, max) => Math.floor(Math.random() * (max - Math.ceil(min) + 1)) + Math.ceil(min);