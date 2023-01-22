import { predictPlace } from './predict';
import { goToPlace, zoomToLocation } from './view';
import { STREET_ZOOM } from '../constants';
import { MapViews } from '../ducks/types';
import {
  setBlocksStyle,
  setNeighborhoodsStyle,
  setPrivateStreetsStyle,
  setSitesStyle,
} from './style';
import { BasicTreeInfo } from '../../treePopup';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { parseLatLng } from '../../../utils/stringFormat';

// Logic for adding event listeners and handling events

/**
 * Adds an event listener to handle location searches.
 * @param autocomplete the autocomplete to add the listener to
 * @param autoService the autocomplete service to use
 * @param placesService the places service to use
 * @param callback the function to execute after predicting a place
 * @param searchMarker the marker to display where the user has searched
 * @param map the map
 */
export function addHandleSearch(
  autocomplete: google.maps.places.Autocomplete,
  autoService: google.maps.places.AutocompleteService,
  placesService: google.maps.places.PlacesService,
  callback: (
    place: google.maps.places.PlaceResult,
    status: google.maps.places.PlacesServiceStatus,
  ) => void,
  searchMarker: google.maps.Marker,
  map: google.maps.Map,
): void {
  autocomplete.addListener('place_changed', () => {
    const place: google.maps.places.PlaceResult = autocomplete.getPlace();
    // If the place does not have a geometry (if the user did not enter a valid location)
    if (!place.geometry) {
      const latLng = parseLatLng(place.name);
      if (!latLng) {
        // Predicts the place the user wanted and sets the search marker at that place
        predictPlace(place, autoService, placesService, callback);
        return;
      }

      place.geometry = {
        location: new google.maps.LatLng(latLng[0], latLng[1]),
        viewport: new google.maps.LatLngBounds(),
      };
    }

    // Goes to the place they searched for
    goToPlace(place, searchMarker, map, STREET_ZOOM);
  });
}

/**
 * Adds an event listener to zoom to a neighborhood when it is clicked.
 * @param neighborhoodsLayer the neighborhoods layer
 * @param view the view
 * @param map the map
 */
export function addZoomToClickedNeighborhood(
  neighborhoodsLayer: google.maps.Data,
  view: MapViews,
  map: google.maps.Map,
): void {
  neighborhoodsLayer.addListener('click', (event) => {
    zoomToLocation(
      new google.maps.LatLng(
        event.feature.getProperty('lat'),
        event.feature.getProperty('lng'),
      ),
      map,
      view,
    );
  });
}

// todo complete
/*
export function addShowReservationModal(): void {
  // adds listener so reservation modal appears when block clicked
  blocksLayer.addListener('click', (event) => {
    // get status of block based on color
    const status: ReservationModalType = ((): ReservationModalType => {
      switch (event.feature.getProperty('blockId') % 10) {
        case 1:
          return ReservationModalType.TAKEN;
        case 0:
          return ReservationModalType.RESERVED;
        default:
          return ReservationModalType.OPEN;
      }
    })();
    // show modal
    setShowModal(true);
    // set status of block
    setReservationType(status);
    // set id of block
    setActiveBlockId(event.feature.getProperty('blockId'));
  });
}
 */

/**
 * Adds an event listener to show a tree popup when a site is clicked.
 * @param sitesLayer the sites layer
 * @param setActiveTreeInfo the callback to update the active tree information
 * @param popPopup the callback to show the popup at a location
 */
export function addTreePopupOnClick(
  sitesLayer: google.maps.Data,
  setActiveTreeInfo: (value: BasicTreeInfo) => void,
  popPopup: (latLng: google.maps.LatLng) => void,
): void {
  sitesLayer.addListener('click', (event) => {
    const eventFeature = event.feature;

    // Sets the information to display in the popup
    setActiveTreeInfo({
      id: eventFeature.getProperty('id'),
      commonName: eventFeature.getProperty('commonName'),
      address: eventFeature.getProperty('address'),
      treePresent: eventFeature.getProperty('treePresent'),
    });
    // Popup appears at the site
    eventFeature.getGeometry().forEachLatLng(popPopup);
  });
}

/**
 * Adds an event listener to handle zoom changes.
 * @param neighborhoodsLayer the neighborhoods layer
 * @param markersArray the array of neighborhood label markers
 * @param privateStreetsLayer the private streets layer
 * @param blocksLayer the blocks layer
 * @param sitesLayer the sites layer
 * @param visibleSites which sites are visible
 * @param view the view
 * @param map the map
 */
export function addHandleZoomChange(
  neighborhoodsLayer: google.maps.Data,
  markersArray: google.maps.Marker[],
  privateStreetsLayer: google.maps.Data,
  blocksLayer: google.maps.Data,
  sitesLayer: google.maps.Data,
  visibleSites: CheckboxValueType[],
  view: MapViews,
  map: google.maps.Map,
): google.maps.MapsEventListener {
  return google.maps.event.addListener(map, 'zoom_changed', () => {
    const zoomLevel = map.getZoom();
    let zoomedIn = false;

    if (zoomLevel >= view) {
      zoomedIn = true;
    }
    setNeighborhoodsStyle(neighborhoodsLayer, markersArray, !zoomedIn);
    setPrivateStreetsStyle(privateStreetsLayer, false);

    switch (view) {
      case MapViews.BLOCKS:
        setBlocksStyle(blocksLayer, zoomedIn);
        break;
      case MapViews.TREES:
        setSitesStyle(
          sitesLayer,
          visibleSites,
          getImageSize(zoomLevel, view),
          zoomedIn,
        );
        break;
    }
  });
}

/**
 * Determines the image size given the zoom level and the view.
 * @param zoomLevel the zoom level
 * @param view the view
 */
export function getImageSize(zoomLevel: number, view: MapViews): number {
  let imageSize = 0;
  if (zoomLevel >= STREET_ZOOM) {
    imageSize = 2;
  } else if (zoomLevel > view + 1) {
    imageSize = 1;
  }
  return imageSize;
}
