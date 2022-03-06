import React from 'react';
import { Typography } from 'antd';
import { BACKGROUND_GREEN, BLACK } from '../../utils/colors';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

interface GreetingContainerProps {
  readonly header: string;
  readonly body: string;
  readonly height?: string;
  readonly padding?: string;
}

interface InfoContainerProps {
  readonly height?: string;
  readonly padding?: string;
}

const InfoContainer = styled.div`
  padding: ${(props: InfoContainerProps) =>
    props.padding ? props.padding : '70px 70px 20px'};
  width: 100%;
  height: ${(props: InfoContainerProps) =>
    props.height ? props.height : '60vh'};
  background: url(${logo}) no-repeat bottom right ${BACKGROUND_GREEN};
  background-size: 65%;
  box-shadow: 1.58105px 3.16211px 6.32421px ${BLACK}25;
  border-radius: 6.32421px;
  overflow: auto;
`;

const GreetingContainer: React.FC<GreetingContainerProps> = ({
  header,
  body,
  height,
  padding,
}) => {
  return (
    <InfoContainer height={height} padding={padding}>
      <Typography.Title style={{ color: BLACK }}>{header}</Typography.Title>
      <Typography.Paragraph>{body}</Typography.Paragraph>
    </InfoContainer>
  );
};

export default GreetingContainer;
