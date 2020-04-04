export const range = (count, from = 0) => new Array(count).fill(0).map(($, i) => i + from);
export const rnd = (min, max) => Math.floor(Math.random() * (max - Math.ceil(min) + 1)) + Math.ceil(min);