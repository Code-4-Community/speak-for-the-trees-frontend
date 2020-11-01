import React from 'react';
import MapSidebar from '../map-sidebar/MapSidebar';
import MapView from '../map-view/MapView';
import './map-page.less';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

type MapPageProps = {
  sidebarTitle: string;
  sidebarDescription: string;
};

const MapPage: React.FC<MapPageProps> = (props) => {
  const sideBarWidth = 471;

  return (
    <>
      <Layout>
        <Content>
          <MapView />
        </Content>

        <Sider width={sideBarWidth} theme="light">
          <div className="map-sidebar-container">
            <MapSidebar
              sidebarTitle={props.sidebarTitle}
              sidebarDescription={props.sidebarDescription}
            >
              {props.children}
            </MapSidebar>
          </div>
        </Sider>
      </Layout>
    </>
  );
};

export default MapPage;
