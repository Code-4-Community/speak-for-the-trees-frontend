import { isMobile } from '../isCheck';
import { WindowTypes } from '../../components/windowDimensions';

test('isMobile tests', () => {
  expect(isMobile(WindowTypes.Desktop)).toBe(false);
  expect(isMobile(WindowTypes.NarrowDesktop)).toBe(false);
  expect(isMobile(WindowTypes.Tablet)).toBe(false);
  expect(isMobile(WindowTypes.Mobile)).toBe(true);
});
