import React from 'react';
import PageLayout from '../../pageLayout';
import MapContent from '../mapContent';
import { MainContent } from '../../themedComponents';
import { MapGeoDataReducerState, MapViews } from '../ducks/types';
import { Routes } from '../../../App';

interface MobileMapPageProps {
  readonly view: MapViews;
  readonly blocks: MapGeoDataReducerState['blockGeoData'];
  readonly neighborhoods: MapGeoDataReducerState['neighborhoodGeoData'];
  readonly sites: MapGeoDataReducerState['siteGeoData'];
  readonly returnTo: Routes;
}

const MobileMapPage: React.FC<MobileMapPageProps> = ({
  view,
  blocks,
  neighborhoods,
  sites,
  children,
  returnTo,
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
          returnTo={returnTo}
        />
        {children}
      </PageLayout>
    </MainContent>
  </>
);

export default MobileMapPage;
