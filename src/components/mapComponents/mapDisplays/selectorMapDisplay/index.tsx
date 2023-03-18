import React from 'react';
import { Alert, Spin } from 'antd';
import styled from 'styled-components';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../../../utils/asyncRequest';
import { MapGeoDataReducerState } from '../../ducks/types';
import SelectorMap from '../../maps/selectorMap';
import { SiteProps } from '../../../../containers/treePage/ducks/types';
import { MAP_TYPES } from '../../constants';

const EmptyMapContainer = styled.div`
  text-align: center;
  padding: 20vh 5vw;
`;

interface SelectorMapDisplayProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
  readonly onMove: (pos: google.maps.LatLng) => void;
  readonly site?: SiteProps;
  readonly mapTypeId: string;
  readonly setMapTypeId: React.Dispatch<React.SetStateAction<string>>;
}

const SelectorMapDisplay: React.FC<SelectorMapDisplayProps> = ({
  neighborhoods,
  sites,
  onMove,
  site,
  mapTypeId,
  setMapTypeId,
}) => (
  <>
    {asyncRequestIsComplete(neighborhoods) && asyncRequestIsComplete(sites) && (
      <SelectorMap
        neighborhoods={neighborhoods.result}
        sites={sites.result}
        onMove={onMove}
        site={site}
        mapTypeId={mapTypeId}
        setMapTypeId={setMapTypeId}
      />
    )}
    {(asyncRequestIsFailed(neighborhoods) || asyncRequestIsFailed(sites)) && (
      <EmptyMapContainer>
        <Alert
          message="Error"
          description="Map data failed to load"
          type="error"
          showIcon
        />
      </EmptyMapContainer>
    )}
    {(asyncRequestIsLoading(neighborhoods) || asyncRequestIsLoading(sites)) && (
      <EmptyMapContainer>
        <Spin size="large" />
      </EmptyMapContainer>
    )}
  </>
);

export default SelectorMapDisplay;
