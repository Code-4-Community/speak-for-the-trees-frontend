import React from 'react';
import { Typography } from 'antd';
import { DARKGREY } from '../../colors';
import styled from 'styled-components';
import useWindowDimensions, { WindowTypes } from '../window-dimensions';
const { Paragraph } = Typography;

interface PageHeaderProps {
  readonly pageTitle: string;
  readonly pageSubtitle: string;
  readonly subtitleColor?: string;
}

interface StyledSubtitleProps {
  readonly textColor?: string;
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
  const { windowType } = useWindowDimensions();
  return (
    <div>
      <StyledTitle
        style={{
          marginTop: `${windowType === WindowTypes.Mobile ? '0vh' : '1vh'}`,
        }}
      >
        {pageTitle}
      </StyledTitle>
      <StyledSubtitle textColor={subtitleColor}>{pageSubtitle}</StyledSubtitle>
    </div>
  );
};

export default PageHeader;
