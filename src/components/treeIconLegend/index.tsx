import React from 'react';
import styled from 'styled-components';
import { Col, Image, Row, Typography } from 'antd';
import {
  ADOPTED_TREE_ICON_DESCRIPTION,
  TREE_ICON_DESCRIPTION,
  YOUNG_TREE_ICON_DESCRIPTION,
} from '../../assets/content';
import adoptedTreeIcon from '../../assets/images/adoptedTreeIcon.png';
import treeIcon from '../../assets/images/treeIcon.png';
import youngTreeIcon from '../../assets/images/youngTreeIcon.png';

const { Paragraph, Text } = Typography;

const StyledImage = styled(Image)`
  display: inline-block;
`;

const CenterCol = styled(Col)`
  text-align: center;
`;

const StyledParagraph = styled(Paragraph)`
  line-height: 15px;
  font-size: 0.9em;
  display: inline-block;
  max-width: 90%;
`;

const TreeIconLegend: React.FC = () => {
  return (
    <>
      <Text strong>Trees represented by</Text>
      <br />
      <Row>
        <CenterCol span={3}>
          <StyledImage src={youngTreeIcon} />
        </CenterCol>
        <Col span={21}>
          <StyledParagraph>{YOUNG_TREE_ICON_DESCRIPTION}</StyledParagraph>
        </Col>
      </Row>
      <Row>
        <CenterCol span={3}>
          <StyledImage src={treeIcon} />
        </CenterCol>
        <Col span={21}>
          <StyledParagraph>{TREE_ICON_DESCRIPTION}</StyledParagraph>
        </Col>
      </Row>
      <Row>
        <CenterCol span={3}>
          <StyledImage src={adoptedTreeIcon} />
        </CenterCol>
        <Col span={21}>
          <StyledParagraph>{ADOPTED_TREE_ICON_DESCRIPTION}</StyledParagraph>
        </Col>
      </Row>
    </>
  );
};

export default TreeIconLegend;
