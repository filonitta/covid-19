import moment from 'moment';

export const format = (date, format = 'MM-DD-YYYY') => moment(new Date(date)).format(format);