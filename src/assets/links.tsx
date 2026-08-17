import { isSFTT } from '../utils/isCheck';
import sfttPartnersLogo from './images/sftt-partners.png';

export const SFTT_PARTNER_LOGOS = isSFTT()
  ? sfttPartnersLogo
  : 'https://d2j3fegnzkmagm.cloudfront.net/cambridge-partners.png';

export const CITY_PLANTING_REQUEST_LINK =
  'https://www.boston.gov/departments/parks-and-recreation/how-request-have-tree-planted-city-street';

export const CONTACT_EMAIL = 'adopt@treeboston.org';

export const BOSTON_311_LINK = 'https://www.cityofboston.gov/311/';
