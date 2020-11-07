import React from 'react';
import './map-sidebar.less';
import { Typography } from 'antd';
import { Layout } from 'antd';

const { Title, Paragraph } = Typography;
const { Sider } = Layout;

type MapSidebarProps = {
  readonly header: string;
  readonly description: string;
};

const MapSidebar: React.FC<MapSidebarProps> = (props) => {
  const sideBarWidth = 471;

  return (
    <>
      <Sider width={sideBarWidth} theme="light">
        <div className="sidebar-content-container">
          <Title className="title">{props.header}</Title>

          <Paragraph>{props.description}</Paragraph>

          <div>{props.children}</div>
        </div>
      </Sider>
    </>
  );
};

export default MapSidebar;
