import { NUMERIC_MONTHS } from '../assets/content';
import { MonthYearOption } from '../containers/treePage/ducks/types';

// compare two dates by both month and year
export const compareByMonthYear = (
  monthYear1: MonthYearOption,
  monthYear2: MonthYearOption,
): -1 | 0 | 1 => {
  const month1 = NUMERIC_MONTHS[monthYear1.month];
  const year1 = monthYear1.year;

  const month2 = NUMERIC_MONTHS[monthYear2.month];
  const year2 = monthYear2.year;

  if (year1 === year2 && month1 === month2) {
    // the two dates are the same
    return 0;
  } else if (year1 < year2 || (year1 === year2 && month1 < month2)) {
    // the first year is earlier than the second
    return -1;
  } else {
    // the second year is earlier than the first
    return 1;
  }
};
