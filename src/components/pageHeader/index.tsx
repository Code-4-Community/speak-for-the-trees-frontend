import React from 'react';
import { Typography } from 'antd';
import { DARK_GREEN, DARK_GREY } from '../../utils/colors';
import styled from 'styled-components';
const { Paragraph } = Typography;

interface StyledSubtitleProps {
  readonly subtitlecolor?: string;
}

const StyledTitle = styled(Paragraph)`
  font-size: 44px;
  line-height: 76px;
  color: ${DARK_GREEN};
  font-weight: bold;
`;

const MobileStyledTitle = styled(Paragraph)`
  font-size: 28px;
  line-height: 48px;
  color: ${DARK_GREEN};
  font-weight: bold;
`;

const StyledSubtitle = styled(Paragraph)`
  font-weight: normal;
  font-size: 24px;
  line-height: 32px;
  margin-top: -40px;
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
