import React from 'react';
import { Layout } from 'antd';

const pageLayoutHeight = 'calc(100vh - 83px)';

const PageLayout: React.FC = ({ children }) => {
  return (
    <>
      <Layout style={{ height: pageLayoutHeight }}>{children}</Layout>
    </>
  );
};

export default PageLayout;
