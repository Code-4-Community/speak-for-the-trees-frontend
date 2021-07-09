import React from 'react';
import MapSidebar from '../mapSidebar';
import PageLayout from '../../pageLayout';
import { Layout } from 'antd';
import { MainContent } from '../../themedComponents';
import MapContent from '../mapContent';
import { MapGeoDataReducerState, MapViews } from '../ducks/types';
import MapLegend from '../mapLegend';

interface MapPageProps {
  readonly sidebarHeader: string;
  readonly sidebarDescription: string;
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
  readonly view: MapViews;
}

const MapPage: React.FC<MapPageProps> = ({
  sidebarHeader,
  sidebarDescription,
  view,
  blocks,
  neighborhoods,
  sites,
  children,
}) => (
  <>
    <MainContent>
      <PageLayout>
        <MapContent
          view={view}
          blocks={blocks}
          neighborhoods={neighborhoods}
          sites={sites}
          mobile={false}
        />
        <Layout.Sider width="25vw">
          <MapSidebar header={sidebarHeader} description={sidebarDescription}>
            {view !== MapViews.TREES && (
              <MapLegend view={view} mobile={false} />
            )}
            {children}
          </MapSidebar>
        </Layout.Sider>
      </PageLayout>
    </MainContent>
  </>
);

export default MapPage;
