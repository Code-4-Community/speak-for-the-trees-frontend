import React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

type MapSidebarProps = {
  readonly header: string;
  readonly description: string;
};

export const SideBarContentContainer = styled.div`
  display: block;
  padding: 5vh 1vw;
  height: 100%;
  background: white;
  overflow-y: scroll;
`;

const MapSidebar: React.FC<MapSidebarProps> = ({
  header,
  description,
  children,
}) => {
  return (
    <>
      <SideBarContentContainer>
        <Title className="title">{header}</Title>

        <Paragraph>{description}</Paragraph>
        {children}
      </SideBarContentContainer>
    </>
  );
};

export default MapSidebar;
