import React from 'react';
import MapSidebar from '../map-sidebar/MapSidebar';
import MapView from '../map-view/MapView';
import { Layout } from 'antd';

const { Content } = Layout;

type MapPageProps = {
  readonly sidebarHeader: string;
  readonly sidebarDescription: string;
};

const MapPage: React.FC<MapPageProps> = ({
  sidebarHeader,
  sidebarDescription,
  children,
}) => {
  return (
    <>
      <Layout>
        <Content>
          <MapView />
        </Content>

        <MapSidebar header={sidebarHeader} description={sidebarDescription}>
          {children}
        </MapSidebar>
      </Layout>
    </>
  );
};

export default MapPage;
