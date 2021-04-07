import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { LinkButton } from '../linkButton';
import { LIGHT_GREEN, PALE_GREEN, WHITE } from '../../utils/colors';
import bkg1 from '../../assets/images/bkg1.png';
import bkg2 from '../../assets/images/bkg2.png';
import bkg3 from '../../assets/images/bkg3.png';
import bkg4 from '../../assets/images/bkg4.png';

export interface LinkCardProps {
  readonly text: string;
  readonly path: string;
  readonly background: string;
}

const StyledCard = styled(Card)`
  display: inline-block;
  height: 265px;
  width: 265px;
  margin: auto;
  text-align: center;
  border-radius: 6px;
  border-color: ${PALE_GREEN};
  background-size: 100%;
  &.img1 {
    background: url(${bkg1}) no-repeat;
  }
  &.img2 {
    background: url(${bkg2}) no-repeat;
  }
  &.img3 {
    background: url(${bkg3}) no-repeat;
  }
  &.img4 {
    background: url(${bkg4}) no-repeat;
  }
`;

const StyledLinkButton = styled(LinkButton)`
  height: 40px;
  min-width: 90%;
  margin-top: 80%;
  border: ${LIGHT_GREEN} 4px;
  background: ${LIGHT_GREEN};
  color: ${WHITE};
  font-size: 18px;
  font-weight: 400;
`;

const LinkCard: React.FC<LinkCardProps> = ({ text, path, background }) => {
  return (
    <StyledCard className={background}>
      <StyledLinkButton to={path} component={StyledLinkButton}>
        {text}
      </StyledLinkButton>
    </StyledCard>
  );
};

export default LinkCard;
