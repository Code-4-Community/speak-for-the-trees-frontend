import React from 'react';
import { Typography } from 'antd';
import { DARK_GREEN, DARK_GREY } from '../../utils/colors';
import styled from 'styled-components';
const { Paragraph } = Typography;

interface StyledSubtitleProps {
  readonly subtitleColor?: string;
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
    props.subtitleColor ? props.subtitleColor : { DARK_GREY }};
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
  subtitleColor,
}) => {
  if (isMobile) {
    return (
      <div>
        <MobileStyledTitle>{pageTitle}</MobileStyledTitle>
      </div>
    );
  } else {
    return (
      <div>
        <StyledTitle>{pageTitle}</StyledTitle>
        <StyledSubtitle subtitleColor={subtitleColor}>
          {pageSubtitle}
        </StyledSubtitle>
      </div>
    );
  }
};

export default PageHeader;
