import React from 'react';
import MapSidebar from '../mapSidebar';
import MapView from '../mapView';
import MapLayout from '../mapLayout';
import { Layout } from 'antd';
import { BlockGeoData, NeighborhoodGeoData } from '../ducks/types';
import useWindowDimensions, { WindowTypes } from '../../window-dimensions';

const { Content, Sider, Footer } = Layout;

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
}) => {
  const { windowType } = useWindowDimensions();

  switch (windowType) {
    case WindowTypes.Mobile:
      return (
        <>
          <Layout style={{ height: 'calc(100vh - 83px)' }}>
            <Content>
              <MapView />
            </Content>
            <Footer>
              <MapSidebar
                header={sidebarHeader}
                description={sidebarDescription}
              >
                {children}
              </MapSidebar>
            </Footer>
          </Layout>
        </>
      );
  }

  return (
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
};

export default MapPage;
