import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { WindowTypes } from '../windowDimensions';
import {
  ADOPTION_DIRECTIONS_HEADER,
  FIND_DIRECTION,
  ICONS_DIRECTION,
  REDIRECTED_DIRECTION,
} from '../../assets/content';
import TreeIconLegend from '../treeIconLegend';
import { MID_GREEN } from '../../utils/colors';

const { Paragraph, Text, Title } = Typography;

const MobileTitle = styled(Paragraph)`
  color: ${MID_GREEN};
  font-size: 16px;
  line-height: 12px;
`;

const MobileParagraph = styled(Paragraph)`
  font-size: 10px;
`;

const TreeStatsContainer = styled.div`
  margin-top: 35px;
`;

interface AdoptionDirectionsProps {
  readonly isMobile: boolean;
}

const AdoptionDirections: React.FC<AdoptionDirectionsProps> = ({
  isMobile,
}) => {
  return (
    <>
      {(() => {
        switch (isMobile) {
          case true:
            return (
              <TreeStatsContainer>
                <MobileTitle>{ADOPTION_DIRECTIONS_HEADER}</MobileTitle>

                <MobileParagraph>
                  <Text strong>1. </Text>
                  {FIND_DIRECTION}
                </MobileParagraph>
                <MobileParagraph>
                  <Text strong>2. </Text>
                  {ICONS_DIRECTION}
                </MobileParagraph>
                <TreeIconLegend />
                <MobileParagraph>
                  <Text strong>3. </Text> {REDIRECTED_DIRECTION}
                </MobileParagraph>
              </TreeStatsContainer>
            );

          case false:
            return (
              <TreeStatsContainer>
                <Title level={3}>{ADOPTION_DIRECTIONS_HEADER}</Title>

                <Paragraph>
                  <Text strong>1. </Text>
                  {FIND_DIRECTION}
                </Paragraph>
                <Paragraph>
                  <Text strong>2. </Text>
                  {ICONS_DIRECTION}
                </Paragraph>
                <TreeIconLegend />
                <Paragraph>
                  <Text strong>3. </Text>
                  {REDIRECTED_DIRECTION}
                </Paragraph>
              </TreeStatsContainer>
            );
        }
      })()}
    </>
  );
};

export default AdoptionDirections;
