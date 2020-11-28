import React from 'react';
import { Typography } from 'antd';
import { DARKGREY } from '../../colors';
import styled from 'styled-components';
const { Paragraph } = Typography;

interface PageHeaderProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly subtitleColor: string;
}

interface StyledSubtitleProps {
  readonly textColor: string;
}

const StyledTitle = styled(Paragraph)`
  font-size: 44px;
  line-height: 76px;
  color: #3a681a;
  font-weight: bold;
`;

const StyledSubtitle = styled(Paragraph)`
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  margin-top: -40px;
  color: ${(props: StyledSubtitleProps) =>
    props.textColor ? props.textColor : { DARKGREY }};
`;

const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  subtitleColor,
}) => {
  return (
    <div>
      <StyledTitle>{pageTitle}</StyledTitle>
      <StyledSubtitle textColor={subtitleColor}>{pageSubtitle}</StyledSubtitle>
    </div>
  );
};

export default PageHeader;
