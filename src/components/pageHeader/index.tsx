import React from 'react';
import {
  StyledTitle,
  StyledSubtitle,
  StyledSubtitleProps,
} from '../themedComponents';

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
  return (
    <>
      <StyledTitle isMobile={isMobile}>{pageTitle}</StyledTitle>
      <StyledSubtitle isMobile={isMobile} subtitlecolor={subtitlecolor}>
        {pageSubtitle}
      </StyledSubtitle>
    </>
  );
};

export default PageHeader;
