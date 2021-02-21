import { getMoneyString } from '../landingTreeStats';

test('getMoneyString tests', () => {
  expect(getMoneyString(100000)).toBe('$100,000');

  expect(getMoneyString(123456.789)).toBe('$123,456.79');
});
