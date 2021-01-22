import React from 'react';
import { Typography } from 'antd';
import { DARK_GREEN } from '../../colors';
import styled from 'styled-components';
const { Paragraph } = Typography;

interface MobilePageHeaderProps {
  readonly pageTitle: string;
}

const StyledTitle = styled(Paragraph)`
  font-size: 28px;
  font-weight: bold;
  line-height: 48px;
  color: ${DARK_GREEN};
`;

const MobilePageHeader: React.FC<MobilePageHeaderProps> = ({ pageTitle }) => {
  return (
    <div>
      <StyledTitle>{pageTitle}</StyledTitle>
    </div>
  );
};

export default MobilePageHeader;
