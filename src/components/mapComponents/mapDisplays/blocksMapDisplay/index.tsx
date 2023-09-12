import React from 'react';
import Alert from 'antd/es/alert';
import Layout from 'antd/es/layout';
import Spin from 'antd/es/spin';
import styled from 'styled-components';
import {
  asyncRequestIsComplete,
  asyncRequestIsFailed,
  asyncRequestIsLoading,
} from '../../../../utils/asyncRequest';
import { MapGeoDataReducerState } from '../../ducks/types';
import { Routes } from '../../../../App';
import BlocksMap from '../../maps/blocksMap';

const EmptyMapContainer = styled.div`
  text-align: center;
  padding: 20vh 5vw;
`;

interface BlocksMapDisplayProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly returnTo?: Routes;
}

const BlocksMapDisplay: React.FC<BlocksMapDisplayProps> = ({
  neighborhoods,
  blocks,
  returnTo,
}) => (
  <Layout.Content>
    {asyncRequestIsComplete(neighborhoods) &&
      asyncRequestIsComplete(blocks) && (
        <BlocksMap
          neighborhoods={neighborhoods.result}
          blocks={blocks.result}
          returnTo={returnTo}
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
