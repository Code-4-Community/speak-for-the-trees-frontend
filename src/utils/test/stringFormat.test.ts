import { getMoneyString } from '../stringFormat';
import { getDateString } from '../stringFormat';
import { shortHand } from '../stringFormat';
import { shortHandNames } from '../../assets/content';

test('getMoneyString tests', () => {
  expect(getMoneyString(100000)).toBe('$100,000');
  expect(getMoneyString(123456.789)).toBe('$123,456.79');
});

test('getDateString tests', () => {
  expect(getDateString(new Date(2020, 5, 10))).toBe('6/10/2020');
  expect(getDateString(new Date(2025, 11, 21))).toBe('12/21/2025');
});

test('shortHand tests', () => {
  expect(shortHand('North End', shortHandNames)).toBe('NE');
  expect(shortHand('West End', shortHandNames)).toBe('WE');
  expect(shortHand('Leather District', shortHandNames)).toBe('LD');
  expect(shortHand('Beacon Hill', shortHandNames)).toBe('BH');
  expect(shortHand('Back Bay', shortHandNames)).toBe('BB');
  expect(shortHand('Downtown', shortHandNames)).toBe('DT');
  expect(shortHand('Chinatown', shortHandNames)).toBe('CT');
  expect(shortHand('Bay Village', shortHandNames)).toBe('BV');
  expect(shortHand('Roxbury', shortHandNames)).toBe('Roxbury');
});
