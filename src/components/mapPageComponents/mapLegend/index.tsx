import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Col, Image, Row, Typography } from 'antd';
import {
  ADOPTED_TREE_ICON_DESCRIPTION,
  CLOSED_BLOCK_DESCRIPTION,
  OPEN_BLOCK_DESCRIPTION,
  OPEN_SITE_DESCRIPTION,
  PRIVATE_STREET_DESCRIPTION,
  RESERVED_BLOCK_DESCRIPTION,
  TREE_ICON_DESCRIPTION,
  YOUNG_TREE_ICON_DESCRIPTION,
} from '../../../assets/content';
import adoptedTreeIcon from '../../../assets/images/siteIcons/adoptedLarge.png';
import treeIcon from '../../../assets/images/siteIcons/standardLarge.png';
import youngTreeIcon from '../../../assets/images/siteIcons/youngLarge.png';
import openSiteIcon from '../../../assets/images/siteIcons/openLarge.png';
import { MAP_GREEN, MAP_RED, MAP_YELLOW, RED } from '../../../utils/colors';
import { MapViews } from '../ducks/types';

const { Paragraph, Text } = Typography;

const MapLegendContainer = styled.div`
  margin-bottom: 5px;
`;

const CenterCol = styled(Col)`
  text-align: center;
`;

const FlexibleParagraph = styled(Paragraph)`
  line-height: 15px;
  font-size: ${(props: FlexibleParagraphProps) => props.fontSize};
  display: inline-block;
  max-width: 90%;
`;

const ToggleTextButton = styled(Button)`
  padding: 0px;
`;

const LegendIcon = styled(Image)`
  display: inline-block;
`;

const RedLine = styled.div`
  width: 60%;
  height: 5px;
  display: inline-block;
  border-top: 2px solid ${RED};
`;

const ColorBlock = styled.div`
  width: 15px;
  height: 15px;
  display: inline-block;
  background: ${(props: ColorBlockProps) => props.color};
`;

interface ColorBlockProps {
  readonly color: string;
}

interface FlexibleParagraphProps {
  readonly fontSize: string;
}

interface MapLegendProps {
  readonly view: MapViews;
  readonly mobile: boolean;
  readonly canHide?: boolean;
}

const MapLegend: React.FC<MapLegendProps> = ({ view, mobile, canHide }) => {
  const [showLegend, setShowLegend] = useState(true);

  const fontSize = `${mobile ? '10px' : '12px'}`;

  const toggleShowLegend = () => {
    setShowLegend((prevState) => !prevState);
  };

  return (
    <MapLegendContainer>
      {(() => {
        switch (view) {
          case MapViews.TREES:
            return (
              <>
                {showLegend && (
                  <>
                    <Text strong>What does each icon mean?</Text>
                    <br />
                    <Row>
                      <CenterCol span={3}>
                        <LegendIcon src={youngTreeIcon} preview={false} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {YOUNG_TREE_ICON_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                    <Row>
                      <CenterCol span={3}>
                        <LegendIcon src={treeIcon} preview={false} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {TREE_ICON_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                    <Row>
                      <CenterCol span={3}>
                        <LegendIcon src={adoptedTreeIcon} preview={false} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {ADOPTED_TREE_ICON_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                    <Row>
                      <CenterCol span={3}>
                        <LegendIcon src={openSiteIcon} preview={false} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {OPEN_SITE_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            );
          case MapViews.BLOCKS:
            return (
              <>
                {showLegend && (
                  <>
                    <Text strong>Blocks that are colored</Text>
                    <br />
                    <Row>
                      <CenterCol span={3}>
                        <ColorBlock color={MAP_GREEN} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {OPEN_BLOCK_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                    <Row>
                      <CenterCol span={3}>
                        <ColorBlock color={MAP_YELLOW} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {RESERVED_BLOCK_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                    <Row>
                      <CenterCol span={3}>
                        <ColorBlock color={MAP_RED} />
                      </CenterCol>
                      <Col span={1} />
                      <Col span={20}>
                        <FlexibleParagraph fontSize={fontSize}>
                          {CLOSED_BLOCK_DESCRIPTION}
                        </FlexibleParagraph>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            );
        }
      })()}
      {showLegend && (
        <>
          <Text strong>Watch out!</Text>
          <br />
          <Row>
            <CenterCol span={3}>
              <RedLine />
            </CenterCol>
            <Col span={1} />
            <Col span={20}>
              <FlexibleParagraph fontSize={fontSize}>
                {PRIVATE_STREET_DESCRIPTION}
              </FlexibleParagraph>
            </Col>
          </Row>
        </>
      )}
      {canHide && (
        <ToggleTextButton type={'link'} onClick={toggleShowLegend}>
          {showLegend ? 'Hide Legend' : 'Show Legend'}
        </ToggleTextButton>
      )}
    </MapLegendContainer>
  );
};

export default MapLegend;
