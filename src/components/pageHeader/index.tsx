import React from 'react';

import {
  StyledTitle,
  StyledSubtitle,
  StyledSubtitleProps,
} from '../themedComponents';
import { isMobile } from '../../utils/isCheck';
import useWindowDimensions from '../windowDimensions';

interface PageHeaderProps extends StyledSubtitleProps {
  readonly pageTitle: string;
  readonly pageSubtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  pageTitle,
  pageSubtitle,
  subtitlecolor,
}) => {
  const { windowType } = useWindowDimensions();
  const mobile = isMobile(windowType);

  return (
    <>
      <StyledTitle isMobile={mobile}>{pageTitle}</StyledTitle>
      <StyledSubtitle isMobile={mobile} subtitlecolor={subtitlecolor}>
        {pageSubtitle}
      </StyledSubtitle>
    </>
  );
};

export default PageHeader;
