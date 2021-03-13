import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import MapView from '../mapView';
import PageLayout from '../../pageLayout';
import { BlockGeoData, NeighborhoodGeoData } from '../ducks/types';

const { Content, Footer } = Layout;

const MainContent = styled.div`
  height: 100%;
  margin-bottom: 15px;
`;

type MobileMapPageProps = {
  readonly blocks: BlockGeoData;
  readonly neighborhoods: NeighborhoodGeoData;
};

const MobileMapPage: React.FC<MobileMapPageProps> = ({
  blocks,
  neighborhoods,
  children,
}) => {
  return (
    <>
      <MainContent>
        <PageLayout>
          <Content>
            <MapView blocks={blocks} neighborhoods={neighborhoods} />
          </Content>
          <Footer>{children}</Footer>
        </PageLayout>
      </MainContent>
    </>
  );
};

export default MobileMapPage;
