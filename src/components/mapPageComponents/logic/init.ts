import {
  createNeighborhoodMarker,
  setBlocksStyle,
  setNeighborhoodsStyle,
  setPrivateStreetsStyle,
  setSitesStyle,
} from './style';
import {
  BlockGeoData,
  MapViews,
  NeighborhoodGeoData,
  SiteGeoData,
} from '../ducks/types';
import { addTreePopupOnClick, addZoomToClickedNeighborhood } from './event';
import { BasicTreeInfo } from '../../treePopup';
import { message } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

// Logic for creating and setting up data layers/markers

/**
 * Creates the private streets layer and sets its initial style, returns the layer.
 * @param map the map to add the layer to
 */
export function initPrivateStreets(map: google.maps.Map): google.maps.Data {
  const privateStreetsLayer = new google.maps.Data({ map });
  // Loads the objects into the layer
  privateStreetsLayer.loadGeoJson(
    'https://raw.githubusercontent.com/florisdobber/SFTT-map-test/master/private_streets.json',
  );
  // Initially hide streets while the neighborhoods are shown
  setPrivateStreetsStyle(privateStreetsLayer, false);
  return privateStreetsLayer;
}

/**
 * Creates the neighborhoods layer, adds the event listener for when a neighborhood is clicked, and
 * sets its initial style, returns the layer.
 * @param neighborhoods the neighborhood geo data
 * @param markersArray the array of markers to put the neighborhood name markers in
 * @param view the map view
 * @param map the map to add the layer to
 */
export function initNeighborhoods(
  neighborhoods: NeighborhoodGeoData,
  markersArray: google.maps.Marker[],
  view: MapViews,
  map: google.maps.Map,
): google.maps.Data {
  const neighborhoodsLayer = new google.maps.Data({ map });
  // Loads the objects into the layer
  neighborhoodsLayer.addGeoJson(neighborhoods);
  // Add a name marker to each neighborhood after the GeoJson loads
  neighborhoodsLayer.forEach((feature) => {
    const marker = createNeighborhoodMarker(feature, map);
    markersArray.push(marker);
    marker.setMap(map);
  });
  // Sets the style of the layer, initially the neighborhoods are shown by themselves
  setNeighborhoodsStyle(neighborhoodsLayer, markersArray, true);
  // Adds the event listener
  addZoomToClickedNeighborhood(neighborhoodsLayer, view, map);
  return neighborhoodsLayer;
}

/**
 * Creates the blocks layer and sets its initial style, returns the layer.
 * @param blocks the blocks geo data
 * @param map the map to add the layer to
 */
export function initBlocks(
  blocks: BlockGeoData,
  map: google.maps.Map,
): google.maps.Data {
  const blocksLayer = new google.maps.Data({ map });
  // Loads the objects into the layer
  blocksLayer.addGeoJson(blocks);
  // Sets the style of the layer, initially hidden while neighborhoods are shown
  setBlocksStyle(blocksLayer, false);
  // todo add show reservation modal event listener
  return blocksLayer;
}

/**
 * Creates the sites layer, sets its initial style, and adds the event listener for when a site is clicked,
 * returns the layer.
 * @param sites the site geo data
 * @param visibleSites which sites are visible
 * @param setActiveTreeInfo the callback function to update the active tree info
 * @param popPopup the callback function to pop the popup at the location
 * @param map the map to add the layer to
 */
export function initSites(
  sites: SiteGeoData,
  visibleSites: CheckboxValueType[],
  setActiveTreeInfo: (value: BasicTreeInfo) => void,
  popPopup: (latLng: google.maps.LatLng) => void,
  map: google.maps.Map,
): google.maps.Data {
  const sitesLayer = new google.maps.Data({ map });
  // Loads the objects into the layer
  sitesLayer.addGeoJson(sites);
  // Adds listener so tree popup appears when site clicked
  addTreePopupOnClick(sitesLayer, setActiveTreeInfo, popPopup);
  // Initially hidden while the neighborhoods are shown
  setSitesStyle(sitesLayer, visibleSites, 0, false);
  return sitesLayer;
}

/**
 * Displays the user's location on the map, if the user has given permission.
 * @param map the map to show the location on
 */
export function initUserLocation(map: google.maps.Map): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const me = new google.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        );
        const userLocation = new google.maps.Marker({
          position: me,
          clickable: false,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 5,
            fillColor: 'blue',
            fillOpacity: 1,
            strokeWeight: 0,
          },
        });
        userLocation.setMap(map);
      },
      () => {
        message
          .info(
            'Enable access to your location to display where you are on the map.',
            5,
          )
          .then();
      },
    );
  }
}
