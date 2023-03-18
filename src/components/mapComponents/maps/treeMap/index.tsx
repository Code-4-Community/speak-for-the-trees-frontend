import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  InitMapData,
  MapViews,
  NeighborhoodGeoData,
  ReturnMapData,
  SiteGeoData,
} from '../../ducks/types';
import { NO_SITE_SELECTED } from '../../../treePopup';
import {
  BOSTON,
  LIGHT_MAP_STYLES,
  MAP_TYPES,
  SITE_OPTIONS_ROADMAP,
  SITE_OPTIONS_SATELLITE,
} from '../../constants';
import { addHandleZoomChange } from '../../logic/event';
import { initSiteView } from '../../logic/init';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { setSitesStyle } from '../../logic/style';
import SiteLegend from '../../mapPageComponents/siteLegend';
import { MapStateProps, Routes } from '../../../../App';
import MapWithPopup from '../mapWithPopup';

interface TreeMapProps {
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sites: SiteGeoData;
  readonly mobile: boolean;
  readonly returnTo?: Routes;
  readonly mapTypeId: string;
  readonly setMapTypeId: React.Dispatch<React.SetStateAction<MAP_TYPES>>;
}

const TreeMap: React.FC<TreeMapProps> = ({
  neighborhoods,
  sites,
  mobile,
  returnTo,
  mapTypeId,
  setMapTypeId,
}) => {
  const location = useLocation<MapStateProps>();

  const [loadedMapData, setLoadedMapData] = useState<ReturnMapData>();

  let defaultZoom = 12;
  let defaultCenter = BOSTON;
  if (location.state) {
    defaultZoom = location.state.zoom;
    defaultCenter = { lat: location.state.lat, lng: location.state.lng };
  }

  const initMap = (mapData: InitMapData): ReturnMapData => {
    // A marker to show at the location a user searches for
    const searchMarker = new google.maps.Marker({
      map: mapData.map,
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
      mapTypeId,
    };
    setLoadedMapData(setMapData);

    mapData.map.setOptions({
      styles: LIGHT_MAP_STYLES,
      // Configures the map to react to all user touch input,
      // allowing one finger to be used to control map movement rather than page scrolling
      gestureHandling: 'greedy',
    });

    return setMapData;
  };

  // Add new zoom listener and update sites style whenever visibleSites changes
  const onCheck = (values: CheckboxValueType[]): void => {
    if (loadedMapData && loadedMapData.sitesLayer) {
      google.maps.event.removeListener(loadedMapData.zoomListener);
      loadedMapData.zoomListener = addHandleZoomChange(
        loadedMapData.neighborhoodsLayer,
        loadedMapData.markersArray,
        loadedMapData.privateStreetsLayer,
        loadedMapData.sitesLayer,
        loadedMapData.sitesLayer,
        values,
        MapViews.TREES,
        loadedMapData.map,
        mapTypeId,
      );
      const zoom = loadedMapData.map.getZoom();
      if (zoom >= MapViews.TREES) {
        setSitesStyle(loadedMapData.sitesLayer, values, zoom, true, mapTypeId);
      }
    }
  };

  return (
    <MapWithPopup
      zoom={defaultZoom}
      view={MapViews.TREES}
      lat={defaultCenter.lat}
      lng={defaultCenter.lng}
      initMap={initMap}
      defaultActiveTree={{
        id: NO_SITE_SELECTED,
        commonName: '',
        address: '',
        treePresent: false,
      }}
      mapTypeId={mapTypeId}
    >
      {!mobile && (
        <SiteLegend
          onCheck={onCheck}
          siteOptions={
            mapTypeId === MAP_TYPES.ROADMAP
              ? SITE_OPTIONS_ROADMAP
              : SITE_OPTIONS_SATELLITE
          }
        />
      )}
    </MapWithPopup>
  );
};

export default TreeMap;
