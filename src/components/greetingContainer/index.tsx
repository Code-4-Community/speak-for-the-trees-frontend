import React from 'react';
import { Typography } from 'antd';
import { BACKGROUND_GREEN, BLACK } from '../../utils/colors';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import { BREAKPOINT_TABLET } from '../windowDimensions';

interface GreetingContainerProps {
  readonly header: string;
  readonly body: string;
}

const InfoContainer = styled.div`
  padding: 50px;
  width: 40%;
  height: 525px;
  background: url(${logo}) no-repeat bottom right ${BACKGROUND_GREEN};
  background-size: 65%;
  box-shadow: 1.58105px 3.16211px 6.32421px ${BLACK}25;
  border-radius: 6.32421px;
  overflow: hidden;

  @media (max-width: ${BREAKPOINT_TABLET}px) {
    width: 90%;
    height: 275px;
  }
`;

const GreetingContainer: React.FC<GreetingContainerProps> = ({
  header,
  body,
}) => {
  return (
    <InfoContainer>
      <Typography.Title style={{ color: BLACK }}>{header}</Typography.Title>
      <Typography.Paragraph>{body}</Typography.Paragraph>
    </InfoContainer>
  );
};

export default GreetingContainer;
