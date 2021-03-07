import { getMoneyString } from '../stringFormat';
import { getDateString } from '../stringFormat';

test('getMoneyString tests', () => {
  expect(getMoneyString(100000)).toBe('$100,000');
  expect(getMoneyString(123456.789)).toBe('$123,456.79');
});

test('getDateString tests', () => {
  expect(getDateString(new Date(2020, 5, 10))).toBe('6/10/2020');
  expect(getDateString(new Date(2025, 11, 21))).toBe('12/21/2025');
});
