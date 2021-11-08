import { sortByMonthYear } from '../sort';

test('sortByMonthYear tests', () => {
  const date1 = { label: 'Jan 2019' };
  const date2 = { label: 'Jan 2019' };
  const date3 = { label: 'May 2019' };
  const date4 = { label: 'May 2020' };
  const date5 = { label: 'Nov 2021' };

  expect(sortByMonthYear(date1, date2)).toBe(0);
  expect(sortByMonthYear(date2, date3)).toBe(-1);
  expect(sortByMonthYear(date3, date4)).toBe(-1);
  expect(sortByMonthYear(date4, date5)).toBe(-1);
  expect(sortByMonthYear(date1, date5)).toBe(-1);
  expect(sortByMonthYear(date3, date2)).toBe(1);
  expect(sortByMonthYear(date4, date3)).toBe(1);
});
