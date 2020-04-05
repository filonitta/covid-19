import moment from 'moment';

export const format = (date, format = 'MM-DD-YYYY') => moment(date).format(format);