import React from 'react';
import MapSidebar from '../mapSidebar';
import PageLayout from '../../pageLayout';
import { Layout } from 'antd';
import { MainContent } from '../../themedComponents';
import MapContent from '../mapContent';
import { MapViews } from '../ducks/types';
import MapLegend from '../mapLegend';

const { Sider } = Layout;

interface MapPageProps {
  readonly sidebarHeader: string;
  readonly sidebarDescription: string;
  readonly view: MapViews;
}

const MapPage: React.FC<MapPageProps> = ({
  sidebarHeader,
  sidebarDescription,
  view,
  children,
}) => (
  <>
    <MainContent>
      <PageLayout>
        <MapContent view={view} />
        <Sider width="20vw">
          <MapSidebar header={sidebarHeader} description={sidebarDescription}>
            <MapLegend view={view} mobile={false} />
            {children}
          </MapSidebar>
        </Sider>
      </PageLayout>
    </MainContent>
  </>
);

export default MapPage;
