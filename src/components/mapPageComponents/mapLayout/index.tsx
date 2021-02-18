import React from 'react';
import { Layout } from 'antd';

const mapLayoutHeight = 'calc(100vh - 83px)';

const MapLayout: React.FC = ({ children }) => {
  return (
    <>
      <Layout style={{ height: mapLayoutHeight }}>{children}</Layout>
    </>
  );
};

export default MapLayout;
