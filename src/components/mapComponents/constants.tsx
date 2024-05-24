import { Loader } from '@googlemaps/js-api-loader';
import youngTreeIcon from '../../assets/images/siteIcons/youngIcon.svg';
import standardTreeIcon from '../../assets/images/siteIcons/standardIcon.svg';
import adoptedTreeIcon from '../../assets/images/siteIcons/adoptedIcon.svg';
import openSiteIcon from '../../assets/images/siteIcons/openIcon.svg';
import satelliteYoungIcon from '../../assets/images/siteIcons/satelliteYoungIcon.svg';
import satelliteStandardIcon from '../../assets/images/siteIcons/satelliteStandardIcon.svg';
import satelliteAdoptedIcon from '../../assets/images/siteIcons/satelliteAdoptedIcon.svg';
import satelliteOpenIcon from '../../assets/images/siteIcons/satelliteOpenIcon.svg';
import { OwnerOption, SiteOption } from './ducks/types';
import { isSFTT } from '../../utils/isCheck';

const MAP_ID = '76c08a2450c223d9';
export const LOADER = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
  libraries: ['places'],
  mapIds: [MAP_ID],
});

const BOSTON = { lat: 42.315, lng: -71.0589 };
const CAMBRIDGE = { lat: 42.3736, lng: -71.1097 };
export const DEFAULT_CENTER: google.maps.LatLngLiteral = isSFTT()
  ? BOSTON
  : CAMBRIDGE;

const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};
const CAMBRIDGE_BOUNDS = {
  north: 42.412,
  south: 42.344,
  west: -71.182,
  east: -71.05,
};
export const MAP_BOUNDS = isSFTT() ? BOSTON_BOUNDS : CAMBRIDGE_BOUNDS;

export const STREET_ZOOM = 19;

export const MOBILE_SLIDE_HEIGHT = 60;
export const DESKTOP_SLIDE_HEIGHT = 70;

// Three years before the current date
export const YOUNG_TREE_DATE = new Date().setFullYear(
  new Date().getFullYear() - 3,
);

export type SiteStatus = 'Young' | 'Adopted' | 'Standard' | 'Open';

export const ALL_SITES_VISIBLE_STATUS: SiteStatus[] = [
  'Young',
  'Adopted',
  'Standard',
  'Open',
];

export type SiteOwner = 'ROW' | 'Park' | 'State' | 'Federal' | 'Private';

export const ALL_SITES_VISIBLE_OWNER: SiteOwner[] = ['ROW'];

export const ALL_SITES_VISIBLE_COMBINED: (SiteStatus | SiteOwner)[] = [
  ...ALL_SITES_VISIBLE_STATUS,
  ...ALL_SITES_VISIBLE_OWNER,
];

export const SITE_OPTIONS_ROADMAP: SiteOption[] = [
  {
    image: youngTreeIcon,
    translationKey: 'young',
    value: 'Young',
  },
  {
    image: standardTreeIcon,
    translationKey: 'older',
    value: 'Standard',
  },
  {
    image: adoptedTreeIcon,
    translationKey: 'adopted',
    value: 'Adopted',
  },
  {
    image: openSiteIcon,
    translationKey: 'open',
    value: 'Open',
  },
];

export const SITE_OPTIONS_SATELLITE: SiteOption[] = [
  {
    image: satelliteYoungIcon,
    translationKey: 'young',
    value: 'Young',
  },
  {
    image: satelliteStandardIcon,
    translationKey: 'older',
    value: 'Standard',
  },
  {
    image: satelliteAdoptedIcon,
    translationKey: 'adopted',
    value: 'Adopted',
  },
  {
    image: satelliteOpenIcon,
    translationKey: 'open',
    value: 'Open',
  },
];

export const SITE_OPTIONS_OWNER: OwnerOption[] = [
  { translationKey: 'row', value: 'ROW' },
  { translationKey: 'park', value: 'Park' },
  { translationKey: 'state', value: 'State' },
  { translationKey: 'federal', value: 'Federal' },
  { translationKey: 'private', value: 'Private' },
];

// Relevant documentation: https://developers.google.com/maps/documentation/javascript/style-reference
// Removes the map's labels for all POIs (points of interest) such as businesses and schools except parks
export const LIGHT_MAP_STYLES: google.maps.MapTypeStyle[] = [
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.park',
    stylers: [
      {
        visibility: 'on',
      },
    ],
  },
];
