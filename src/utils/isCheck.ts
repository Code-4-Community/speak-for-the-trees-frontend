import { WindowTypes } from '../components/windowDimensions';

/**
 * Checks if the window type is mobile
 * @param windowType the window type
 */
export function isMobile(windowType: WindowTypes): boolean {
  return windowType === WindowTypes.Mobile;
}

/**
 * Checks if the string is empty
 * @param str the string
 */
export function isEmptyString(str: string): boolean {
  return str === '';
}
