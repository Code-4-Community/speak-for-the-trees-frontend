import React from 'react';
import MapSidebar from '../map-sidebar/MapSidebar';
import MapView from '../map-view/MapView';
import MapLayout from '../mapLayout';
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
      <MapLayout>
        <Content>
          <MapView />
        </Content>
        <Sider width="20vw">
          <MapSidebar header={sidebarHeader} description={sidebarDescription}>
            {children}
          </MapSidebar>
        </Sider>
      </MapLayout>
    </>
  );
};

export default MapPage;
