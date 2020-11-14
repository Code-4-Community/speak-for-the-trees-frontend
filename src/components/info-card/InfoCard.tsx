import React from 'react';
import { Card, Typography } from 'antd';
import './info-card.less';

const { Paragraph, Title } = Typography;

type InfoCardProps = {
  readonly header: string;
  readonly body: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ header, body }) => {
  return (
    <div className="info-card">
      <Card>
        <Paragraph className="header">{header}</Paragraph>
        <Title level={4} className="body">
          {body}
        </Title>
      </Card>
    </div>
  );
};

export default InfoCard;
