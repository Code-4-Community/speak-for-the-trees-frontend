import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BlockGeoData,
  MapData,
  MapViews,
  NeighborhoodGeoData,
  SetMapData,
} from '../../ducks/types';
import { NO_SITE_SELECTED } from '../../../treePopup';
import { BOSTON } from '../../constants';
import { initBlockView } from '../../logic/init';
import { MapStateProps, Routes } from '../../../../App';
import MapWithPopup from '../mapWithPopup';

interface BlocksMapProps {
  readonly neighborhoods: NeighborhoodGeoData;
  readonly blocks: BlockGeoData;
  readonly returnTo?: Routes;
}

const BlocksMap: React.FC<BlocksMapProps> = ({
  neighborhoods,
  blocks,
  returnTo,
}) => {
  const location = useLocation<MapStateProps>();

  let defaultZoom = 12;
  let defaultCenter = BOSTON;
  if (location.state) {
    defaultZoom = location.state.zoom;
    defaultCenter = { lat: location.state.lat, lng: location.state.lng };
  }

  const initMap = (mapData: MapData): SetMapData => {
    // A marker to show at the location a user searches for
    const searchMarker = new google.maps.Marker({
      map: mapData.map,
    });
    const mapLayersAndListeners = initBlockView(mapData, neighborhoods, blocks);

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
      lat={defaultCenter.lat}
      lng={defaultCenter.lng}
      initMap={initMap}
      defaultActiveTree={{
        id: NO_SITE_SELECTED,
        commonName: '',
        address: '',
      }}
    />
  );
};

export default BlocksMap;
