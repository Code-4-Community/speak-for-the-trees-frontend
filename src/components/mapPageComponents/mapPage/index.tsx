import React from 'react';
import MapSidebar from '../mapSidebar';
import MapView from '../mapView';
import PageLayout from '../../pageLayout';
import { Layout } from 'antd';
import styled from 'styled-components';
import { BlockGeoData, NeighborhoodGeoData, SiteGeoData } from '../ducks/types';

const { Content, Sider } = Layout;

const MainContent = styled.div`
  height: 100%;
`;

type MapPageProps = {
  readonly blocks: BlockGeoData;
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sites: SiteGeoData;
  readonly sidebarHeader: string;
  readonly sidebarDescription: string;
};

const MapPage: React.FC<MapPageProps> = ({
  blocks,
  neighborhoods,
  sites,
  sidebarHeader,
  sidebarDescription,
  children,
}) => (
  <>
    <MainContent>
      <PageLayout>
        <Content>
          <MapView
            blocks={blocks}
            neighborhoods={neighborhoods}
            sites={sites}
          />
        </Content>
        <Sider width="20vw">
          <MapSidebar header={sidebarHeader} description={sidebarDescription}>
            {children}
          </MapSidebar>
        </Sider>
      </PageLayout>
    </MainContent>
  </>
);

export default MapPage;
