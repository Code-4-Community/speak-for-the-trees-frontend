import React from 'react';
import {
  MapViews,
  NeighborhoodGeoData,
  ReturnMapData,
  SiteGeoData,
} from '../../ducks/types';
import { STREET_ZOOM } from '../../constants';

import { BasicTreeInfo, NO_SITE_SELECTED } from '../../../treePopup';
import MapWithPopup from '../mapWithPopup';
import { SiteProps } from '../../../../containers/treePage/ducks/types';
import { InitMapData } from '../../ducks/types';
import { initSiteView } from '../../logic/init';

interface SelectorMapProps {
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sites: SiteGeoData;
  readonly onMove: (pos: google.maps.LatLng) => void;
  readonly site: SiteProps;
}

const SelectorMap: React.FC<SelectorMapProps> = ({
  neighborhoods,
  sites,
  onMove,
  site,
}) => {
  const defaultZoom = STREET_ZOOM;

  // BasicTreeInfo to display in tree popup
  const basicSite: BasicTreeInfo = {
    id: NO_SITE_SELECTED,
    commonName: '',
    address: '',
  };

  const setSearchMarkerAndInitSiteMap = (
    mapData: InitMapData,
  ): ReturnMapData => {
    const searchMarker = new google.maps.Marker({
      map: mapData.map,
      draggable: true,
      position: new google.maps.LatLng(site.lat, site.lng),
    });

    google.maps.event.addListener(searchMarker, 'dragend', () => {
      const latLng = searchMarker.getPosition();
      if (latLng) {
        onMove(latLng);
      }
    });

    const mapLayersAndListeners = initSiteView(mapData, neighborhoods, sites);

    return {
      map: mapData.map,
      zoom: mapData.zoom,
      privateStreetsLayer: mapLayersAndListeners.privateStreetsLayer,
      neighborhoodsLayer: mapLayersAndListeners.neighborhoodsLayer,
      sitesLayer: mapLayersAndListeners.sitesLayer,
      searchMarker,
      zoomListener: mapLayersAndListeners.zoomListener,
      markersArray: mapData.markersArray,
    };
  };

  return (
    <MapWithPopup
      zoom={defaultZoom}
      view={MapViews.TREES}
      lat={site.lat}
      lng={site.lng}
      initMap={setSearchMarkerAndInitSiteMap}
      defaultActiveTree={basicSite}
    />
  );
};

export default SelectorMap;
