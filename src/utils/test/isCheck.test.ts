import { isLoggedIn } from '../isCheck';
import { PrivilegeLevel } from '../../auth/ducks/types';

test('isLoggedIn tests', () => {
  expect(isLoggedIn(PrivilegeLevel.NONE)).toBe(false);
  expect(isLoggedIn(PrivilegeLevel.STANDARD)).toBe(true);
  expect(isLoggedIn(PrivilegeLevel.ADMIN)).toBe(true);
  expect(isLoggedIn(PrivilegeLevel.SUPER_ADMIN)).toBe(true);
});
