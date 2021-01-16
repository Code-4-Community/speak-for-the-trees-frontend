import React from 'react';
import MapSidebar from '../map-sidebar/MapSidebar';
import MapView from '../map-view/MapView';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

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
      <Layout style={{ height: 'calc(100vh - 83px)' }}>
        <Content>
          <MapView />
        </Content>
        <Sider width="20vw">
          <MapSidebar header={sidebarHeader} description={sidebarDescription}>
            {children}
          </MapSidebar>
        </Sider>
      </Layout>
    </>
  );
};

export default MapPage;
