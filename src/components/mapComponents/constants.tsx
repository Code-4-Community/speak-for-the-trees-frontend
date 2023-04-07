import { Loader } from '@googlemaps/js-api-loader';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import youngTreeIcon from '../../assets/images/siteIcons/youngIcon.svg';
import standardTreeIcon from '../../assets/images/siteIcons/standardIcon.svg';
import adoptedTreeIcon from '../../assets/images/siteIcons/adoptedIcon.svg';
import openSiteIcon from '../../assets/images/siteIcons/openIcon.svg';
import satelliteYoungIcon from '../../assets/images/siteIcons/satelliteYoungIcon.svg';
import satelliteStandardIcon from '../../assets/images/siteIcons/satelliteStandardIcon.svg';
import satelliteAdoptedIcon from '../../assets/images/siteIcons/satelliteAdoptedIcon.svg';
import satelliteOpenIcon from '../../assets/images/siteIcons/satelliteOpenIcon.svg';
import { SiteOption } from './ducks/types';
import { Websites, site } from '../../constants';

const MAP_ID = '76c08a2450c223d9';
export const LOADER = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
  libraries: ['places'],
  mapIds: [MAP_ID],
});

const BOSTON = { lat: 42.315, lng: -71.0589 };
const CAMBRIDGE = { lat: 42.3736, lng: -71.1097 };
export const DEFAULT_CENTER: google.maps.LatLngLiteral =
  site === Websites.CAMBRIDGE ? CAMBRIDGE : BOSTON;

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
export const MAP_BOUNDS =
  site === Websites.CAMBRIDGE ? CAMBRIDGE_BOUNDS : BOSTON_BOUNDS;

export const STREET_ZOOM = 19;

export const MOBILE_SLIDE_HEIGHT = 60;
export const DESKTOP_SLIDE_HEIGHT = 70;

// Three years before the current date
export const YOUNG_TREE_DATE = new Date().setFullYear(
  new Date().getFullYear() - 3,
);

export const ALL_SITES_VISIBLE: CheckboxValueType[] = [
  'Young',
  'Adopted',
  'Standard',
  'Open',
];

export const SITE_OPTIONS_ROADMAP: SiteOption[] = [
  {
    image: youngTreeIcon,
    label: 'Young Trees',
    value: 'Young',
  },
  {
    image: standardTreeIcon,
    label: 'Older Trees',
    value: 'Standard',
  },
  {
    image: adoptedTreeIcon,
    label: 'Adopted Trees',
    value: 'Adopted',
  },
  {
    image: openSiteIcon,
    label: 'Planting Sites',
    value: 'Open',
  },
];

export const SITE_OPTIONS_SATELLITE: SiteOption[] = [
  {
    image: satelliteYoungIcon,
    label: 'Young Trees',
    value: 'Young',
  },
  {
    image: satelliteStandardIcon,
    label: 'Older Trees',
    value: 'Standard',
  },
  {
    image: satelliteAdoptedIcon,
    label: 'Adopted Trees',
    value: 'Adopted',
  },
  {
    image: satelliteOpenIcon,
    label: 'Planting Sites',
    value: 'Open',
  },
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
