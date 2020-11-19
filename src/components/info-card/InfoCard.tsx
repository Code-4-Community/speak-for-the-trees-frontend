import React from 'react';
import { Card, Typography } from 'antd';
import './info-card.less';

type InfoCardProps = {
  readonly header: string;
  readonly body: string;
};

const InfoCard: React.FC<InfoCardProps> = ({ header, body }) => {
  return (
    <div>
      <Card>
        <Typography.Paragraph className="header">{header}</Typography.Paragraph>
        <Typography.Title className="body" level={3}>
          {body}
        </Typography.Title>
      </Card>
    </div>
  );
};

export default InfoCard;
