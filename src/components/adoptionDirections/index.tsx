import React from 'react';
import styled from 'styled-components';
import { Col, Row, Typography } from 'antd';
import {
  ADOPTION_DIRECTIONS_HEADER,
  FIND_DIRECTION,
  ICONS_DIRECTION,
  REDIRECTED_DIRECTION,
} from '../../assets/content';
import { MID_GREEN } from '../../utils/colors';

const { Paragraph, Text, Title } = Typography;

const MobileTitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 16px;
  line-height: 12px;
`;

const FlexibleParagraph = styled(Row)`
  font-size: ${(props: FlexibleParagraphProps) => props.fontSize};
  display: inline-block;
`;

interface FlexibleParagraphProps {
  readonly fontSize: string;
}

interface AdoptionDirectionsProps {
  readonly mobile: boolean;
}

const AdoptionDirections: React.FC<AdoptionDirectionsProps> = ({ mobile }) => {
  const fontSize = `${mobile ? '10px' : '12px'}`;

  return (
    <>
      <>
        {mobile ? (
          <MobileTitle>{ADOPTION_DIRECTIONS_HEADER}</MobileTitle>
        ) : (
          <Title level={3}>{ADOPTION_DIRECTIONS_HEADER}</Title>
        )}

        <FlexibleParagraph fontSize={fontSize}>
          <Row>
            <Col span={1}>
              <Text strong>1.</Text>
            </Col>
            <Col span={23}>{FIND_DIRECTION}</Col>
          </Row>

          <Row>
            <Col span={1}>
              <Text strong>2.</Text>
            </Col>
            <Col span={23}>{ICONS_DIRECTION}</Col>
          </Row>

          <Row>
            <Col span={1}>
              <Text strong>3.</Text>
            </Col>
            <Col span={23}>{REDIRECTED_DIRECTION}</Col>
          </Row>
        </FlexibleParagraph>
      </>
    </>
  );
};

export default AdoptionDirections;