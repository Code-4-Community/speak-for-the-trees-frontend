import React from 'react';
import { Typography } from 'antd';
import { DARK_GREEN, DARK_GREY } from '../../utils/colors';
import styled from 'styled-components';

interface StyledSubtitleProps {
  readonly subtitlecolor?: string;
}

const StyledTitle = styled(Typography.Paragraph)`
  font-size: 44px;
  line-height: 76px;
  color: ${DARK_GREEN};
  font-weight: bold;
`;

const MobileStyledTitle = styled(Typography.Paragraph)`
  font-size: 30px;
  line-height: 48px;
  color: ${DARK_GREEN};
  font-weight: bold;
`;

const StyledSubtitle = styled(Typography.Paragraph)`
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  margin-top: -40px;
  color: ${(props: StyledSubtitleProps) =>
    props.subtitlecolor ? props.subtitlecolor : { DARK_GREY }};
`;

const MobileStyledSubtitle = styled(Typography.Paragraph)`
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;
  margin-top: -20px;
  color: ${(props: StyledSubtitleProps) =>
    props.subtitlecolor ? props.subtitlecolor : { DARK_GREY }};
`;

interface PageHeaderProps extends StyledSubtitleProps {
  readonly pageTitle: string;
  readonly isMobile?: boolean;
  readonly pageSubtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  isMobile,
  pageSubtitle,
  subtitlecolor,
}) => {
  if (isMobile) {
    return (
      <>
        <MobileStyledTitle>{pageTitle}</MobileStyledTitle>
        <MobileStyledSubtitle subtitlecolor={subtitlecolor}>
          {pageSubtitle}
        </MobileStyledSubtitle>
      </>
    );
  } else {
    return (
      <>
        <StyledTitle>{pageTitle}</StyledTitle>
        <StyledSubtitle subtitlecolor={subtitlecolor}>
          {pageSubtitle}
        </StyledSubtitle>
      </>
    );
  }
};

export default PageHeader;
