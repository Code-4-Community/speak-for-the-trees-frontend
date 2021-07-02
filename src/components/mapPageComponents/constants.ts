import { Loader } from '@googlemaps/js-api-loader';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const MAP_ID = '76c08a2450c223d9';
export const LOADER = new Loader({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY || '',
  libraries: ['places'],
  mapIds: [MAP_ID],
});

export const BOSTON: google.maps.LatLngLiteral = { lat: 42.315, lng: -71.0589 };
export const BOSTON_BOUNDS = {
  north: 42.42,
  south: 42.2,
  west: -71.28,
  east: -70.83,
};

export const STREET_ZOOM = 19;

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
export const SITE_OPTIONS: { label: string; value: string }[] = [
  { label: 'Young Trees', value: 'Young' },
  { label: 'Older Trees', value: 'Standard' },
  { label: 'Adopted Trees', value: 'Adopted' },
  { label: 'Open Planting Sites', value: 'Open' },
];