import React from 'react';
import './greeting-container.less';
import { Typography } from 'antd';

const { Paragraph, Title } = Typography;

interface GreetingContainerProps {
  readonly header: string,
  readonly body: string
}

const GreetingContainer: React.FC<GreetingContainerProps> = ({header, body}) => {
  return (
    <div className="info-container">
      <Title style={{'color': '#000000'}}>{header}</Title>
      <div className="body-text-container">
        <Paragraph>{body}</Paragraph>
      </div>
    </div>
  );
}

export default GreetingContainer;