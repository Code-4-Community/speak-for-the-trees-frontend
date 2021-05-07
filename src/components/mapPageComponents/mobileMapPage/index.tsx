import React from 'react';
import PageLayout from '../../pageLayout';
import MapContent from '../mapContent';
import { MainContent } from '../../themedComponents';
import { MapViews } from '../ducks/types';

interface MobileMapPageProps {
  readonly view: MapViews;
}

const MobileMapPage: React.FC<MobileMapPageProps> = ({ view, children }) => (
  <>
    <MainContent>
      <PageLayout>
        <MapContent view={view} />
        {children}
      </PageLayout>
    </MainContent>
  </>
);

export default MobileMapPage;
