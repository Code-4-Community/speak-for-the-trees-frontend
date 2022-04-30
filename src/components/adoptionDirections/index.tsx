import React from 'react';
import styled from 'styled-components';
import { Row, Typography } from 'antd';
import {
  ADOPTION_DIRECTIONS_HEADER,
  FIND_DIRECTION,
  ICONS_DIRECTION,
  REDIRECTED_DIRECTION,
} from '../../assets/content';
import { MID_GREEN } from '../../utils/colors';
import { DESKTOP_FONT_SIZE, MOBILE_FONT_SIZE } from '../themedComponents';

const MobileTitle = styled(Typography.Paragraph)`
  color: ${MID_GREEN};
  font-size: 16px;
  line-height: 12px;
`;

const FlexibleParagraph = styled(Row)`
  font-size: ${(props: FlexibleParagraphProps) => props.fontSize};
  display: inline-block;
`;

const NumberCol = styled.span`
  margin-right: 5px;
`;

const DirectionCol = styled.span`
  width: 90%;
`;

interface FlexibleParagraphProps {
  readonly fontSize: string;
}

interface AdoptionDirectionsProps {
  readonly mobile: boolean;
}

const AdoptionDirections: React.FC<AdoptionDirectionsProps> = ({ mobile }) => {
  const fontSize = `${mobile ? MOBILE_FONT_SIZE : DESKTOP_FONT_SIZE}`;

  return (
    <div>
      {mobile ? (
        <MobileTitle>{ADOPTION_DIRECTIONS_HEADER}</MobileTitle>
      ) : (
        <Typography.Title level={3}>
          {ADOPTION_DIRECTIONS_HEADER}
        </Typography.Title>
      )}

      <FlexibleParagraph fontSize={fontSize}>
        <Row>
          <NumberCol>
            <Typography.Text strong>1.</Typography.Text>
          </NumberCol>
          <DirectionCol>{FIND_DIRECTION}</DirectionCol>
        </Row>

        <Row>
          <NumberCol>
            <Typography.Text strong>2.</Typography.Text>
          </NumberCol>
          <DirectionCol>{ICONS_DIRECTION}</DirectionCol>
        </Row>

        <Row>
          <NumberCol>
            <Typography.Text strong>3.</Typography.Text>
          </NumberCol>
          <DirectionCol>{REDIRECTED_DIRECTION}</DirectionCol>
        </Row>
      </FlexibleParagraph>
    </div>
  );
};

export default AdoptionDirections;
