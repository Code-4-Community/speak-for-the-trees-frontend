import React, { PropsWithChildren } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

type MapSidebarProps = {
  readonly header: string;
  readonly description: string | JSX.Element;
};

export const SideBarContentContainer = styled.div`
  display: block;
  padding: 5vh 1vw;
  height: 100%;
  background: white;
  overflow-y: scroll;
`;

const MapSidebar: React.FC<PropsWithChildren<MapSidebarProps>> = ({
  header,
  description,
  children,
}) => {
  return (
    <>
      <SideBarContentContainer>
        <Typography.Title className="title">{header}</Typography.Title>

        <Typography.Paragraph>{description}</Typography.Paragraph>
        {children}
      </SideBarContentContainer>
    </>
  );
};

export default MapSidebar;
