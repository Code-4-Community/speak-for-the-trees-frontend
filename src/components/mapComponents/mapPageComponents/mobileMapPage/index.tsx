import React, { PropsWithChildren } from 'react';
import PageLayout from '../../../pageLayout';
import { MainContent } from '../../../themedComponents';
import { Routes } from '../../../../App';

interface MobileMapPageProps {
  readonly mapContent: JSX.Element;
  readonly returnTo: Routes;
}

const MobileMapPage: React.FC<PropsWithChildren<MobileMapPageProps>> = ({
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
