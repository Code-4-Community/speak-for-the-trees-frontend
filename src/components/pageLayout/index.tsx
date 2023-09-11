import React, { PropsWithChildren } from 'react';
import Layout from 'antd/es/layout';

const pageLayoutHeight = 'calc(100vh - 83px)';

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Layout style={{ height: pageLayoutHeight }}>{children}</Layout>
    </>
  );
};

export default PageLayout;
