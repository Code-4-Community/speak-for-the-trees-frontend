import React from 'react';
import { Typography } from 'antd';
import { BLACK } from '../../utils/colors';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

const { Paragraph, Title } = Typography;

interface GreetingContainerProps {
  readonly header: string;
  readonly body: string;
  readonly height?: string;
}

interface InfoContainerProps {
  readonly height?: string;
}

const InfoContainer = styled.div`
  padding: 70px 70px 20px;
  height: ${(props: InfoContainerProps) =>
    props.height ? props.height : '481px'};
  background: url(${logo}) no-repeat bottom right #d4edaa;
  box-shadow: 1.58105px 3.16211px 6.32421px rgba(0, 0, 0, 0.09);
  border-radius: 6.32421px;
  min-width: 300px;
`;

const TextContainer = styled.div`
  max-width: 380px;
`;

const GreetingContainer: React.FC<GreetingContainerProps> = ({
  header,
  body,
  height,
}) => {
  return (
    <InfoContainer height={height}>
      <Title style={{ color: BLACK }}>{header}</Title>
      <TextContainer>
        <Paragraph>{body}</Paragraph>
      </TextContainer>
    </InfoContainer>
  );
};

export default GreetingContainer;
