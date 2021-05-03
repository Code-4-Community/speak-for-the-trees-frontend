import { getMoneyString } from '../stringFormat';
import { getDateString } from '../stringFormat';
import { shortHand } from '../stringFormat';
import { SHORT_HAND_NAMES } from '../../assets/content';

test('getMoneyString tests', () => {
  expect(getMoneyString(100000)).toBe('$100,000');
  expect(getMoneyString(123456.789)).toBe('$123,456.79');
});

test('getDateString tests', () => {
  expect(getDateString(new Date(2020, 5, 10))).toBe('6/10/2020');
  expect(getDateString(new Date(2025, 11, 21))).toBe('12/21/2025');
});

test('shortHand tests', () => {
  expect(shortHand('North End', SHORT_HAND_NAMES)).toBe('NE');
  expect(shortHand('West End', SHORT_HAND_NAMES)).toBe('WE');
  expect(shortHand('Leather District', SHORT_HAND_NAMES)).toBe('LD');
  expect(shortHand('Beacon Hill', SHORT_HAND_NAMES)).toBe('BH');
  expect(shortHand('Back Bay', SHORT_HAND_NAMES)).toBe('BB');
  expect(shortHand('Downtown', SHORT_HAND_NAMES)).toBe('DT');
  expect(shortHand('Chinatown', SHORT_HAND_NAMES)).toBe('CT');
  expect(shortHand('Bay Village', SHORT_HAND_NAMES)).toBe('BV');
  expect(shortHand('Roxbury', SHORT_HAND_NAMES)).toBe('Roxbury');
});
