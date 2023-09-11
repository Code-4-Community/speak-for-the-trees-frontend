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
  DEFAULT_CENTER,
  LIGHT_MAP_STYLES,
  SITE_OPTIONS_ROADMAP,
  SITE_OPTIONS_SATELLITE,
} from '../../constants';
import { addHandleZoomChange } from '../../logic/event';
import { initSiteView } from '../../logic/init';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { setSitesStyle } from '../../logic/style';
import SiteLegend from '../../mapPageComponents/siteLegend';
import { MapStateProps, Routes } from '../../../../App';
import MapWithPopup from '../mapWithPopup';
import { MapTypes } from '../../../../context/types';
import { useMapTypeContext } from '../../../../context/mapTypeContext';

interface TreeMapProps {
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sites: SiteGeoData;
  readonly mobile: boolean;
  readonly returnTo?: Routes;
}

const TreeMap: React.FC<TreeMapProps> = ({
  neighborhoods,
  sites,
  mobile,
  returnTo,
}) => {
  const location = useLocation<MapStateProps>();

  const [loadedMapData, setLoadedMapData] = useState<ReturnMapData>();
  const [mapTypeId, setMapTypeId] = useMapTypeContext();

  let defaultZoom = 12;
  let defaultCenter = DEFAULT_CENTER;
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
    >
      <SiteLegend
        onCheck={onCheck}
        siteOptions={
          mapTypeId === MapTypes.ROADMAP
            ? SITE_OPTIONS_ROADMAP
            : SITE_OPTIONS_SATELLITE
        }
        mobile={mobile}
      />
    </MapWithPopup>
  );
};

export default TreeMap;
