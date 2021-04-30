import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import MapView from '../mapView';
import PageLayout from '../../pageLayout';
import { BlockGeoData, NeighborhoodGeoData } from '../ducks/types';

const { Content } = Layout;

const MainContent = styled.div`
  height: 100%;
`;

type MobileMapPageProps = {
  readonly blocks: BlockGeoData;
  readonly neighborhoods: NeighborhoodGeoData;
};

const MobileMapPage: React.FC<MobileMapPageProps> = ({
  blocks,
  neighborhoods,
  children,
}) => (
  <>
    <MainContent>
      <PageLayout>
        <Content>
          <MapView blocks={blocks} neighborhoods={neighborhoods} />
        </Content>
        {children}
      </PageLayout>
    </MainContent>
  </>
);

export default MobileMapPage;
