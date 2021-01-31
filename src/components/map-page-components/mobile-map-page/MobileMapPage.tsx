import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import MapView from '../map-view/MapView';
import MobileFooter from '../../../mobile-footer/MobileFooter';

const { Content, Footer } = Layout;

const MainContent = styled.div`
  height: 100%;
  margin-bottom: 15px;
`;

const MobileMapPage: React.FC = ({ children }) => {
  return (
    <>
      <MainContent>
        <Layout style={{ height: 'calc(100vh - 83px)' }}>
          <Content>
            <MapView />
          </Content>
          <Footer>{children}</Footer>
        </Layout>
      </MainContent>
      <MobileFooter />
    </>
  );
};

export default MobileMapPage;
