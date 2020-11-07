import React from 'react';
import { Card, Typography } from 'antd';
import './info-card.less';

const { Paragraph, Title } = Typography;

type InfoCardProps = {
  readonly header: string;
  readonly body: string;
};

const InfoCard: React.FC<InfoCardProps> = (props) => {
  return (
    <div>
      <Card>
        <Paragraph className="header">{props.header}</Paragraph>
        <Title className="body" level={3}>{props.body}</Title>
      </Card>
    </div>
  );
};

export default InfoCard;
