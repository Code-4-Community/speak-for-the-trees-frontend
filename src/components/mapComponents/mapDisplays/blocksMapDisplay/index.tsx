import React from 'react';
import { Alert, Layout, Spin } from 'antd';
import styled from 'styled-components';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../../../utils/asyncRequest';
import { MapGeoDataReducerState } from '../../ducks/types';
import { Routes } from '../../../../App';
import BlocksMap from '../../maps/blocksMap';
import { MapTypes, SetStateType } from '../../../../context/types';

const EmptyMapContainer = styled.div`
  text-align: center;
  padding: 20vh 5vw;
`;

interface BlocksMapDisplayProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly returnTo?: Routes;
  readonly setMapTypeId: SetStateType<MapTypes>;
}

const BlocksMapDisplay: React.FC<BlocksMapDisplayProps> = ({
  neighborhoods,
  blocks,
  returnTo,
  setMapTypeId,
}) => (
  <Layout.Content>
    {asyncRequestIsComplete(neighborhoods) &&
      asyncRequestIsComplete(blocks) && (
        <BlocksMap
          neighborhoods={neighborhoods.result}
          blocks={blocks.result}
          returnTo={returnTo}
          setMapTypeId={setMapTypeId}
        />
      )}
    {(asyncRequestIsFailed(neighborhoods) || asyncRequestIsFailed(blocks)) && (
      <EmptyMapContainer>
        <Alert
          message="Error"
          description="Map data failed to load"
          type="error"
          showIcon
        />
      </EmptyMapContainer>
    )}
    {(asyncRequestIsLoading(neighborhoods) ||
      asyncRequestIsLoading(blocks)) && (
      <EmptyMapContainer>
        <Spin size="large" />
      </EmptyMapContainer>
    )}
  </Layout.Content>
);

export default BlocksMapDisplay;
