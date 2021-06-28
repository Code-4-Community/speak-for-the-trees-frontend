import { Loader } from '@googlemaps/js-api-loader';

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
