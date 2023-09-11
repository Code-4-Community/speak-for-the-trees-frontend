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
import TreeMap from '../../maps/treeMap';
import { Routes } from '../../../../App';

const EmptyMapContainer = styled.div`
  text-align: center;
  padding: 20vh 5vw;
`;

interface TreeMapDisplayProps {
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
  readonly mobile: boolean;
  readonly returnTo?: Routes;
}

const TreeMapDisplay: React.FC<TreeMapDisplayProps> = ({
  neighborhoods,
  sites,
  mobile,
  returnTo,
}) => (
  <Layout.Content>
    {asyncRequestIsComplete(neighborhoods) && asyncRequestIsComplete(sites) && (
      <TreeMap
        neighborhoods={neighborhoods.result}
        sites={sites.result}
        mobile={mobile}
        returnTo={returnTo}
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
  </Layout.Content>
);

export default TreeMapDisplay;
