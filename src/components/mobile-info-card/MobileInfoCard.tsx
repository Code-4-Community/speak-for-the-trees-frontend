import React from 'react';
import { Card, Typography } from 'antd';
import styled from 'styled-components';
import { MID_GREEN, TEXT_GREY } from '../../utils/colors';

interface MobileInfoCardProps {
  readonly header: string;
  readonly body: string;
}

const MobileMapCard = styled(Card)`
  width: 110px;
  height: 85px;
`;

const CardHeader = styled(Typography.Paragraph)`
  margin: -10px -20px 0px -12px;
  font-size: 8px;
  color: ${TEXT_GREY};
`;

const CardBody = styled(Typography.Paragraph)`
  margin: 0px -20px -50px -12px;
  font-size: 10px;
  color: ${MID_GREEN};
`;

const MobileInfoCard: React.FC<MobileInfoCardProps> = ({ header, body }) => {
  return (
    <div>
      <MobileMapCard>
        <CardHeader>{header}</CardHeader>
        <CardBody>{body}</CardBody>
      </MobileMapCard>
    </div>
  );
};

export default MobileInfoCard;
