import { dateSorter } from '../utils';

test('dateSorter', () => {
  // todo property test
  const date1: Date = new Date();
  const date2: Date = new Date(date1.valueOf() - 1);
  const date3: Date = new Date(date1.valueOf() - 21);

  expect(dateSorter(date1, date2)).toEqual(1);
  expect(dateSorter(date2, date1)).toEqual(-1);
  expect(dateSorter(date3, date2)).toEqual(-20);
  expect(dateSorter(date1, date1)).toEqual(0);
});
