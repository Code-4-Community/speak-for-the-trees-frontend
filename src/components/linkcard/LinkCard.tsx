import React from 'react';
import './linkcard.less';
import styled from 'styled-components';
import { Card } from 'antd';
import { LinkButton } from '../LinkButton';
import { LIGHT_GREEN, WHITE } from '../../colors';

interface LinkCardProps {
  readonly text: string;
  readonly path: string;
  readonly background: string;
}

const StyledCard = styled(({ ...props }) => <Card {...props} />)`
  width: 265px;
  height: 265px;
  padding-top: 183px;
  border-radius: 6px;
  text-align: center;
`;

const StyledLinkButton = styled(LinkButton)`
  width: 202px;
  height: 40px;
  padding: 0px;
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
