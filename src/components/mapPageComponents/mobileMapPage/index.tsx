import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import MapView from '../mapView';
import MapLayout from '../mapLayout';
import MobileFooter from '../../mobileComponents/mobileFooter';

const { Content, Footer } = Layout;

const MainContent = styled.div`
  height: 100%;
  margin-bottom: 15px;
`;

const MobileMapPage: React.FC = ({ children }) => {
  return (
    <>
      <MainContent>
        <MapLayout>
          <Content>
            <MapView />
          </Content>
          <Footer>{children}</Footer>
        </MapLayout>
      </MainContent>
      <MobileFooter />
    </>
  );
};

export default MobileMapPage;
