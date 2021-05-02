import React from 'react';
import { connect } from 'react-redux';
import { Alert, Layout, Spin } from 'antd';
import styled from 'styled-components';
import { C4CState } from '../../../store';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../../utils/asyncRequest';
import { MapGeoDataReducerState } from '../ducks/types';
import MapView from '../mapView';

const { Content } = Layout;

const EmptyMapContainer = styled.div`
  text-align: center;
  padding: 20vh 5vw;
`;

interface MapContentProps {
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const MapContent: React.FC<MapContentProps> = ({
  blocks,
  neighborhoods,
  sites,
}) => (
  <Content>
    {asyncRequestIsComplete(blocks) &&
      asyncRequestIsComplete(neighborhoods) &&
      asyncRequestIsComplete(sites) && (
        <MapView
          blocks={blocks.result}
          neighborhoods={neighborhoods.result}
          sites={sites.result}
        />
      )}
    {(asyncRequestIsFailed(blocks) ||
      asyncRequestIsFailed(neighborhoods) ||
      asyncRequestIsFailed(sites)) && (
      <EmptyMapContainer>
        <Alert
          message="Error"
          description="Map data failed to load"
          type="error"
          showIcon
        />
      </EmptyMapContainer>
    )}
    {(asyncRequestIsLoading(blocks) ||
      asyncRequestIsLoading(neighborhoods) ||
      asyncRequestIsLoading(sites)) && (
      <EmptyMapContainer>
        <Spin size="large" />
      </EmptyMapContainer>
    )}
  </Content>
);

const mapStateToProps = (state: C4CState): MapContentProps => {
  return {
    neighborhoods: state.mapGeoDataState.neighborhoodGeoData,
    blocks: state.mapGeoDataState.blockGeoData,
    sites: state.mapGeoDataState.siteGeoData,
  };
};

export default connect(mapStateToProps)(MapContent);
