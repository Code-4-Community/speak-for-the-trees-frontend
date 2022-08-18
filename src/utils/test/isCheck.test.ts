import { isEmptyString, isMobile } from '../isCheck';
import { WindowTypes } from '../../components/windowDimensions';

test('isMobile tests', () => {
  expect(isMobile(WindowTypes.Desktop)).toBe(false);
  expect(isMobile(WindowTypes.NarrowDesktop)).toBe(false);
  expect(isMobile(WindowTypes.Tablet)).toBe(false);
  expect(isMobile(WindowTypes.Mobile)).toBe(true);
});

test('isEmptyString tests', () => {
  expect(isEmptyString('')).toBe(true);
  expect(isEmptyString(' ')).toBe(false);
  expect(isEmptyString('a')).toBe(false);
  expect(isEmptyString('test test')).toBe(false);
});
