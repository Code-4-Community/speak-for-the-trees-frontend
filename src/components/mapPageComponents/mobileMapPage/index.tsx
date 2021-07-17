import React from 'react';
import PageLayout from '../../pageLayout';
import MapContent from '../mapContent';
import { MainContent } from '../../themedComponents';
import { MapGeoDataReducerState, MapViews } from '../ducks/types';

interface MobileMapPageProps {
  readonly view: MapViews;
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
}

const MobileMapPage: React.FC<MobileMapPageProps> = ({
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
          mobile={true}
        />
        {children}
      </PageLayout>
    </MainContent>
  </>
);

export default MobileMapPage;
