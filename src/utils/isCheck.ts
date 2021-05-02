import { PrivilegeLevel } from '../auth/ducks/types';
import { WindowTypes } from '../components/windowDimensions';

/**
 * Checks if the user is logged in
 * @param privilegeLevel the user's privilege level
 */
export function isLoggedIn(privilegeLevel: PrivilegeLevel): boolean {
  return privilegeLevel !== PrivilegeLevel.NONE;
}

/**
 * Checks if the window type is mobile
 * @param windowType the window type
 */
export function isMobile(windowType: WindowTypes): boolean {
  return windowType === WindowTypes.Mobile;
}
