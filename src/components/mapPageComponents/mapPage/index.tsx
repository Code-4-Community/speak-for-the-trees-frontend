import React from 'react';
import MapSidebar from '../mapSidebar';
import MapView from '../mapView';
import MapLayout from '../mapLayout';
import { Layout } from 'antd';
import { BlockGeoData, NeighborhoodGeoData } from '../ducks/types';

const { Content, Sider } = Layout;

type MapPageProps = {
  readonly blocks: BlockGeoData;
  readonly neighborhoods: NeighborhoodGeoData;
  readonly sidebarHeader: string;
  readonly sidebarDescription: string;
};

const MapPage: React.FC<MapPageProps> = ({
  blocks,
  neighborhoods,
  sidebarHeader,
  sidebarDescription,
  children,
}) => (
  <>
    <MapLayout>
      <Content>
        <MapView blocks={blocks} neighborhoods={neighborhoods} />
      </Content>
      <Sider width="20vw">
        <MapSidebar header={sidebarHeader} description={sidebarDescription}>
          {children}
        </MapSidebar>
      </Sider>
    </MapLayout>
  </>
);

export default MapPage;
