import {
  booleanToString,
  combineScientificName,
  compareMainEntries,
  formatDateSuffix,
  getMoneyString,
} from '../stringFormat';
import { getDateString } from '../stringFormat';
import { shortHand } from '../stringFormat';
import { SHORT_HAND_NAMES } from '../../assets/content';
import { Entry } from '../../containers/treePage/ducks/types';

test('getMoneyString tests', () => {
  expect(getMoneyString(100000)).toBe('$100,000');
  expect(getMoneyString(123456.789)).toBe('$123,456.79');
});

test('getDateString tests', () => {
  expect(getDateString(new Date(2020, 5, 10))).toBe('6/10/2020');
  expect(getDateString(new Date(2025, 11, 21))).toBe('12/21/2025');
});

test('formatDateSuffix tests', () => {
  expect(formatDateSuffix(1)).toBe('1st');
  expect(formatDateSuffix(2)).toBe('2nd');
  expect(formatDateSuffix(3)).toBe('3rd');
  expect(formatDateSuffix(4)).toBe('4th');
  expect(formatDateSuffix(7)).toBe('7th');
  expect(formatDateSuffix(11)).toBe('11th');
  expect(formatDateSuffix(12)).toBe('12th');
  expect(formatDateSuffix(15)).toBe('15th');
  expect(formatDateSuffix(19)).toBe('19th');
  expect(formatDateSuffix(20)).toBe('20th');
  expect(formatDateSuffix(21)).toBe('21st');
  expect(formatDateSuffix(31)).toBe('31st');
  expect(formatDateSuffix(42)).toBe('42nd');
  expect(formatDateSuffix(109)).toBe('109th');
  expect(formatDateSuffix(22893074921)).toBe('22893074921st');
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

test('booleanToString tests', () => {
  expect(booleanToString('true')).toBe('Yes');
  expect(booleanToString('false')).toBe('No');
  expect(booleanToString('neither')).toBe('neither');
  expect(booleanToString('NEITHER')).toBe('NEITHER');
});

test('compareMainEntries tests', () => {
  expect(
    compareMainEntries(
      { title: 'Updated At', value: 'test' },
      { title: 'Common Name', value: 'test' },
    ),
  ).toBe(-1);
  expect(
    compareMainEntries(
      { title: 'Common Name', value: 'test' },
      { title: 'Updated At', value: 'test' },
    ),
  ).toBe(1);
  expect(
    compareMainEntries(
      { title: 'Scientific Name', value: 'test' },
      { title: 'Common Name', value: 'test' },
    ),
  ).toBe(1);
  expect(
    compareMainEntries(
      { title: 'Status', value: 'test' },
      { title: 'Diameter at Breast Height (inches)', value: 'test' },
    ),
  ).toBe(1);
  expect(
    compareMainEntries(
      { title: 'Scientific Name', value: 'test' },
      { title: 'Genus', value: 'test' },
    ),
  ).toBe(1);
  expect(
    compareMainEntries(
      { title: 'Scientific Name', value: 'test' },
      { title: 'Species', value: 'test' },
    ),
  ).toBe(-1);
  expect(
    compareMainEntries(
      { title: 'Fake Title', value: 'test' },
      { title: 'Updated At', value: 'test' },
    ),
  ).toBe(1);
});

test('combineScientificName tests', () => {
  const genus: Entry = { title: 'Genus', value: 'genus' };
  const species: Entry = { title: 'Species', value: 'species' };
  const random: Entry = { title: 'Updated At', value: 'date' };
  const random2: Entry = { title: 'Status', value: 'fine' };
  const random3: Entry = { title: 'Common Name', value: 'tree' };

  expect(combineScientificName([])).toEqual([]);
  expect(combineScientificName([genus, species])).toEqual([
    { title: 'Scientific Name', value: 'genus species' },
  ]);
  expect(combineScientificName([genus])).toEqual([genus]);
  expect(combineScientificName([species])).toEqual([species]);
  expect(
    combineScientificName([random, genus, random2, species, random3]),
  ).toEqual([
    random,
    random2,
    random3,
    { title: 'Scientific Name', value: 'genus species' },
  ]);
});
