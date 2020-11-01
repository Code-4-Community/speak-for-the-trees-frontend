import React from 'react';
import { getMoneyString } from '../landing-tree-status/LandingTreeStats';

test('getMoneyString tests', () => {
  expect(getMoneyString(100000)).toBe('$100,000');

  expect(getMoneyString(123456.789)).toBe('$123,456.79');
});
