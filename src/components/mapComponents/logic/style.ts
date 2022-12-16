import {
  BLACK,
  DARK_GREY,
  MAP_GREEN,
  MAP_RED,
  MAP_YELLOW,
  RED,
  WHITE,
} from '../../../utils/colors';
import { YOUNG_TREE_DATE } from '../constants';
import adoptedIcon from '../../../assets/images/siteIcons/adoptedIcon.svg';
import openIcon from '../../../assets/images/siteIcons/openIcon.svg';
import standardIcon from '../../../assets/images/siteIcons/standardIcon.svg';
import youngIcon from '../../../assets/images/siteIcons/youngIcon.svg';
import { shortHand } from '../../../utils/stringFormat';
import { SHORT_HAND_NAMES } from '../../../assets/content';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { getImageSize } from './event';
import { MapViews } from '../ducks/types';

// Logic to style data layers on map

/**
 * Sets the style of the private streets layer
 * @param privateStreetsLayer the layer
 * @param v true to make the layer visible, false to make it invisible
 */
export function setPrivateStreetsStyle(
  privateStreetsLayer: google.maps.Data,
  v: boolean,
): void {
  privateStreetsLayer.setStyle({
    strokeColor: `${RED}`,
    strokeWeight: 2,
    visible: v,
  });
}

/**
 * Sets the style of the blocks layer according to its reservation status
 * @param blocksLayer the layer
 * @param v true to make the layer visible, false to make it invisible
 */
export function setBlocksStyle(
  blocksLayer: google.maps.Data,
  v: boolean,
): void {
  if (v) {
    blocksLayer.setStyle((feature) => {
      let color = `${MAP_GREEN}`;

      // Use this for coloring reserved/completed blocks a different color
      if (feature.getProperty('blockId') % 10 === 0) {
        color = `${MAP_YELLOW}`;
      }

      if (feature.getProperty('blockId') % 10 === 1) {
        color = `${MAP_RED}`;
      }

      // Use this for selecting blocks
      if (feature.getProperty('PRECINCT') === 'YES') {
        color = `${BLACK}`;
      }

      // Set styling here
      return {
        fillColor: color,
        strokeColor: `${BLACK}`,
        strokeWeight: 1,
        visible: true,
      };
    });
  } else {
    blocksLayer.setStyle({ visible: false });
  }
}

/**
 * Sets the style of the neighborhoods layer according to its canopy coverage and updates the visibility of neighborhood markers.
 * @param neighborhoodsLayer the layer
 * @param markers the array containing the neighborhood markers
 * @param v true to make the layer visible, false to make it invisible
 */
export function setNeighborhoodsStyle(
  neighborhoodsLayer: google.maps.Data,
  markers: google.maps.Marker[],
  v: boolean,
): void {
  toggleMarkers(markers, v);
  neighborhoodsLayer.setStyle((feature) => {
    return {
      fillColor: `${MAP_GREEN}`,
      fillOpacity: feature.getProperty('canopyCoverage'),
      strokeWeight: 1,
      strokeColor: `${DARK_GREY}`,
      visible: v,
    };
  });
}

/**
 * Creates a marker to show the name of the given neighborhood feature at that neighborhood's position.
 * @param feature the neighborhood
 * @param map the map to add the marker to
 * @return the neighborhood marker
 */
export function createNeighborhoodMarker(
  feature: google.maps.Data.Feature,
  map: google.maps.Map,
): google.maps.Marker {
  return new google.maps.Marker({
    map,
    draggable: false,
    label: {
      color: `${WHITE}`,
      fontWeight: 'bold',
      text: shortHand(feature.getProperty('name'), SHORT_HAND_NAMES),
    },
    // Removed the icon here, only text on map.
    icon: {
      labelOrigin: new google.maps.Point(11, 50),
      url: '',
      size: new google.maps.Size(22, 40),
    },
    position: {
      lat: feature.getProperty('lat'),
      lng: feature.getProperty('lng'),
    },
  });
}

/**
 * Toggles all of the markers in the given array to the given visibility.
 * @param markersArray the array of markers
 * @param v true to make markers visible, false to make invisible
 */
function toggleMarkers(markersArray: google.maps.Marker[], v: boolean) {
  for (const marker of markersArray) {
    marker.setVisible(v);
  }
}

/**
 * Sets the style of the sites layer according to each tree's age and adoption status and the zoom level.
 * @param sitesLayer the layer
 * @param visibleSites which sites are visible
 * @param zoomLevel the zoom level between 16 and 22 where zooming in increases zoom level
 * @param visible true to make the layer visible, false to make it invisible
 */
export function setSitesStyle(
  sitesLayer: google.maps.Data,
  visibleSites: CheckboxValueType[],
  zoomLevel: number,
  visible: boolean,
): void {
  if (visible) {
    let siteVisible: boolean;

    sitesLayer.setStyle((feature) => {
      let iconType: string;
      const plantedDate = feature.getProperty('plantingDate');
      const adopted = !!feature.getProperty('adopterId');
      if (!feature.getProperty('treePresent')) {
        // If there is no tree present, use the openSiteIcon
        iconType = openIcon;
        siteVisible = visibleSites.includes('Open');
      } else if (adopted) {
        // If the tree is adopted, use the adoptedTreeIcon
        iconType = adoptedIcon;
        siteVisible = visibleSites.includes('Adopted');
      } else if (!!plantedDate && plantedDate > YOUNG_TREE_DATE) {
        // If the tree was planted within the past three years, use youngTreeIcon
        iconType = youngIcon;
        siteVisible = visibleSites.includes('Young');
      } else {
        iconType = standardIcon;
        siteVisible = visibleSites.includes('Standard');
      }

      const iconSize = getImageSize(zoomLevel);
      return {
        icon: {
          url: iconType,
          scaledSize: new google.maps.Size(iconSize, iconSize),
        },
        visible: siteVisible,
      };
    });
  } else {
    sitesLayer.setStyle({ visible: false });
  }
}
