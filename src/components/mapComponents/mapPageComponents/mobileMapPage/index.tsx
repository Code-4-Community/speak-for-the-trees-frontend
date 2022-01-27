import React from 'react';
import PageLayout from '../../../pageLayout';
import { MainContent } from '../../../themedComponents';
import { Routes } from '../../../../App';

interface MobileMapPageProps {
  readonly mapContent: JSX.Element;
  readonly returnTo: Routes;
}

const MobileMapPage: React.FC<MobileMapPageProps> = ({
  mapContent,
  children,
}) => (
  <>
    <MainContent>
      <PageLayout>
        {mapContent}
        {children}
      </PageLayout>
    </MainContent>
  </>
);

export default MobileMapPage;
