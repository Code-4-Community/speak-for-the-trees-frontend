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

/**
 * Checks if the string is a valid latitude/longitude input format
 * @param str the string to check
 */
export function isValidLatLng(str: string): boolean {
  const latLng = str.split(',');
  if (latLng.length !== 2) {
    return false;
  }

  const latitude = parseFloat(latLng[0]);
  const longitude = parseFloat(latLng[1]);

  return !isNaN(latitude) && !isNaN(longitude);
}
