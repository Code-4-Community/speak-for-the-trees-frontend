import { isEmptyString, isMobile, isValidLatLng } from '../isCheck';
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

test('isValidLatLng tests', () => {
  expect(isValidLatLng('')).toBe(false);
  expect(isValidLatLng(',')).toBe(false);
  expect(isValidLatLng('42.1, -71.98')).toBe(true);
  expect(isValidLatLng('25, 30, 1')).toBe(false);
  expect(isValidLatLng('test, test')).toBe(false);
  expect(isValidLatLng(' 14    , -90  ')).toBe(true);
});
