import React from 'react';
import './pageheader.less';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

interface PageHeaderProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly subtitleColor: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  subtitleColor,
}) => {
  return (
    <div className="header">
      <Title id="title">{pageTitle}</Title>
      <Paragraph className="subtitle" id={subtitleColor}>
        {pageSubtitle}
      </Paragraph>
    </div>
  );
};

export default PageHeader;
