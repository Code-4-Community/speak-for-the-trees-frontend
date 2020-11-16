import React from 'react';
import './pageheader.less';
import { Typography } from 'antd';
import styled from 'styled-components';
const { Title, Paragraph } = Typography;

interface PageHeaderProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly subtitleColor: string;
}

interface StyledSubtitleProps {
  readonly textColor: string;
}

const StyledTitle = styled(Title)`
  font-size: 44px;
  line-height: 76px;
  color: #3a681a;
  font-weight: bold;
  margin-bottom: 0px;
`;

const StyledSubtitle = styled(Paragraph)`
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  color: ${(props: StyledSubtitleProps) =>
    props.textColor ? props.textColor : '#444444'};
`;

const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  subtitleColor,
}) => {
  return (
    <div className="header">
      <StyledTitle>{pageTitle}</StyledTitle>
      <StyledSubtitle textColor={subtitleColor}>{pageSubtitle}</StyledSubtitle>
    </div>
  );
};

export default PageHeader;