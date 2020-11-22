import React from 'react';
import { Card, Typography } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { TitleProps } from 'antd/lib/typography/Title';
import styled from 'styled-components';
import { TEXT_GREY } from '../../colors';

const { Paragraph, Title } = Typography;

type InfoCardProps = {
  readonly header: string;
  readonly body: string;
};

const CardHeader: typeof Paragraph = styled(Paragraph)<ParagraphProps>`
  color: ${TEXT_GREY};
  font-size: 18px;
  line-height: 1;
`
const CardBody: typeof Title = styled(Title)<TitleProps>`
  margin-bottom: 0px;
`

const InfoCard: React.FC<InfoCardProps> = ({ header, body }) => {
  return (
    <div>
      <Card>
        <CardHeader>{header}</CardHeader>
          <CardBody level={3}>
            {body}
          </CardBody>
      </Card>
    </div>
  );
};

export default InfoCard;
