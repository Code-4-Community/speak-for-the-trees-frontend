import React from 'react';
import MapSidebar from '../map-sidebar/MapSidebar';
import MapView from '../map-view/MapView';
import { Layout } from 'antd';

const { Content } = Layout;

type MapPageProps = {
  readonly sidebarHeader: string;
  readonly sidebarDescription: string;
};

const MapPage: React.FC<MapPageProps> = (props) => {

  return (
    <>
      <Layout>
        <Content>
          <MapView />
        </Content>

        <MapSidebar 
          header={props.sidebarHeader}
          description={props.sidebarDescription}
        >
          {props.children}
        </MapSidebar>  
      </Layout>
    </>
  );
};

export default MapPage;
