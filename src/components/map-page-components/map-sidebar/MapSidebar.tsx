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

        <div>{children}</div>
      </SideBarContentContainer>
    </>
  );
};

export default MapSidebar;
