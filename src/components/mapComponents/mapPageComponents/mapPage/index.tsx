import React from 'react';
import MapSidebar from '../mapSidebar';
import PageLayout from '../../../pageLayout';
import { Layout } from 'antd';
import { MainContent } from '../../../themedComponents';
import { MapViews } from '../../ducks/types';
import MapLegend from '../../mapLegend';
import { WindowTypes } from '../../../windowDimensions';

interface MapPageProps {
  readonly mapContent: JSX.Element;
  readonly sidebarHeader: string;
  readonly sidebarDescription: string | JSX.Element;
  readonly view: MapViews;
  readonly windowType: WindowTypes;
}

const MapPage: React.FC<MapPageProps> = ({
  mapContent,
  sidebarHeader,
  sidebarDescription,
  view,
  windowType,
  children,
}) => (
  <>
    <MainContent>
      <PageLayout>
        {mapContent}
        <Layout.Sider
          width={windowType === WindowTypes.Desktop ? '20vw' : '25vw'}
        >
          <MapSidebar header={sidebarHeader} description={sidebarDescription}>
            {view !== MapViews.TREES && <MapLegend view={view} />}
            {children}
          </MapSidebar>
        </Layout.Sider>
      </PageLayout>
    </MainContent>
  </>
);

export default MapPage;
