import { NUMERIC_MONTHS } from '../assets/content';

// sort two dates by both month and year
export const sortByMonthYear = (
  yearMonth1: { label: string },
  yearMonth2: { label: string },
): -1 | 0 | 1 => {
  const label1 = yearMonth1.label;
  const label2 = yearMonth2.label;

  const year1 = label1.slice(-4);
  const month1 = NUMERIC_MONTHS[label1.slice(0, 3)];
  const year2 = label2.slice(-4);
  const month2 = NUMERIC_MONTHS[label2.slice(0, 3)];

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
