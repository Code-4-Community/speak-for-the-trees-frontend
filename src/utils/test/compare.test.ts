import { compareByMonthYear } from '../compare';

test('compareByMonthYear tests', () => {
  const date1 = { month: 'Jan', year: 2019 };
  const date2 = { month: 'Jan', year: 2019 };
  const date3 = { month: 'May', year: 2019 };
  const date4 = { month: 'May', year: 2020 };
  const date5 = { month: 'Nov', year: 2021 };

  expect(compareByMonthYear(date1, date2)).toBe(0);
  expect(compareByMonthYear(date2, date3)).toBe(-1);
  expect(compareByMonthYear(date3, date4)).toBe(-1);
  expect(compareByMonthYear(date4, date5)).toBe(-1);
  expect(compareByMonthYear(date1, date5)).toBe(-1);
  expect(compareByMonthYear(date3, date2)).toBe(1);
  expect(compareByMonthYear(date4, date3)).toBe(1);
});
