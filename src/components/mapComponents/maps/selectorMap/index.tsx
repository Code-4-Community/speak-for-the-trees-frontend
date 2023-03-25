import React from 'react';
import {
  MapViews,
  NeighborhoodGeoData,
  ReturnMapData,
  SiteGeoData,
} from '../../ducks/types';
import { BOSTON, STREET_ZOOM } from '../../constants';

import { BasicTreeInfo, NO_SITE_SELECTED } from '../../../treePopup';
import MapWithPopup from '../mapWithPopup';
import { SiteProps } from '../../../../containers/treePage/ducks/types';
import { InitMapData } from '../../ducks/types';
import { initSiteView } from '../../logic/init';
import { MapTypes, SetStateType } from '../../../../context/types';
import { MapTypeContext } from '../../../../context/mapTypeContext';

interface SelectorMapProps {
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sites: SiteGeoData;
  readonly onMove: (pos: google.maps.LatLng) => void;
  readonly site?: SiteProps;
  readonly setMapTypeId: SetStateType<MapTypes>;
}

const SelectorMap: React.FC<SelectorMapProps> = ({
  neighborhoods,
  sites,
  onMove,
  site,
  setMapTypeId,
}) => {
  const defaultZoom = STREET_ZOOM;

  const defaultCenter: google.maps.LatLngLiteral = site
    ? { lat: site.lat, lng: site.lng }
    : BOSTON;

  // BasicTreeInfo to display in tree popup
  const basicSite: BasicTreeInfo = {
    id: NO_SITE_SELECTED,
    commonName: '',
    address: '',
    treePresent: false,
  };

  const setSearchMarkerAndInitSiteMap = (
    mapData: InitMapData,
  ): ReturnMapData => {
    const searchMarker = new google.maps.Marker({
      map: mapData.map,
      draggable: true,
      position: new google.maps.LatLng(defaultCenter.lat, defaultCenter.lng),
    });

    google.maps.event.addListener(searchMarker, 'dragend', () => {
      const latLng = searchMarker.getPosition();
      if (latLng) {
        onMove(latLng);
      }
    });

    const mapLayersAndListeners = initSiteView(
      mapData,
      neighborhoods,
      sites,
      setMapTypeId,
    );

    const setMapData: ReturnMapData = {
      map: mapData.map,
      zoom: mapData.zoom,
      privateStreetsLayer: mapLayersAndListeners.privateStreetsLayer,
      neighborhoodsLayer: mapLayersAndListeners.neighborhoodsLayer,
      sitesLayer: mapLayersAndListeners.sitesLayer,
      searchMarker,
      zoomListener: mapLayersAndListeners.zoomListener,
      mapTypeListener: mapLayersAndListeners.mapTypeListener,
      markersArray: mapData.markersArray,
      mapTypeId: MapTypes.SATELLITE, // FLAG
    };

    mapData.map.setOptions({
      // Configures the map to react to all user touch input,
      // allowing one finger to be used to control map movement rather than page scrolling
      gestureHandling: 'greedy',
    });

    return setMapData;
  };

  return (
    <MapTypeContext.Consumer>
      {(mapTypeId) => (
        <MapWithPopup
          zoom={defaultZoom}
          view={MapViews.TREES}
          lat={defaultCenter.lat}
          lng={defaultCenter.lng}
          initMap={setSearchMarkerAndInitSiteMap}
          defaultActiveTree={basicSite}
          mapTypeId={mapTypeId}
        />
      )}
    </MapTypeContext.Consumer>
  );
};

export default SelectorMap;
