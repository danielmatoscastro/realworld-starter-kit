import { format } from 'date-fns';

export const formatDate = (date) => format(new Date(date ?? new Date()), 'MMMM d, y');

export default formatDate;
