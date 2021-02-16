import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import MapView from '../mapView';
import MapLayout from '../mapLayout';
import MobileFooter from '../../mobileComponents/mobileFooter';
import { BlockGeoData, NeighborhoodGeoData } from '../ducks/types';

const { Content, Footer } = Layout;

const MainContent = styled.div`
  height: 100%;
  margin-bottom: 15px;
`;

type MobileMapPageProps = {
  readonly blocks: BlockGeoData;
  readonly neighborhoods: NeighborhoodGeoData;
  readonly isPadding: boolean;
};

const MobileMapPage: React.FC<MobileMapPageProps> = ({
  blocks,
  neighborhoods,
  isPadding,
  children
}) => {
  return (
    <>
      <MainContent>
        <MapLayout>
          <Content>
            <MapView blocks={blocks} neighborhoods={neighborhoods} />
          </Content>
          {isPadding ? (
            <Footer>{children}</Footer>
          ) : (
            <Footer style={{ padding: 0 }}>{children}</Footer>
          )}
        </MapLayout>
      </MainContent>
      <MobileFooter />
    </>
  );
};

export default MobileMapPage;
