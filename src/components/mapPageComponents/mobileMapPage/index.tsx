import React from 'react';
import PageLayout from '../../pageLayout';
import MapContent from '../mapContent';
import { MainContent } from '../../themedComponents';

const MobileMapPage: React.FC = ({ children }) => (
  <>
    <MainContent>
      <PageLayout>
        <MapContent />
        {children}
      </PageLayout>
    </MainContent>
  </>
);

export default MobileMapPage;
