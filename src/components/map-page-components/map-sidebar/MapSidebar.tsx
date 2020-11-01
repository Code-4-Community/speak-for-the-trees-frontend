import React from 'react';
import './map-sidebar.less';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

type MapSidebarProps = {
  sidebarTitle: string;
  sidebarDescription: string;
};

const MapSidebar: React.FC<MapSidebarProps> = (props) => {
  return (
    <div>
      <Title className="title">{props.sidebarTitle}</Title>

      <Paragraph>{props.sidebarDescription}</Paragraph>

      <div>{props.children}</div>
    </div>
  );
};

export default MapSidebar;
