import * as React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import LeaderboardPanels from '../leaderboardSpace';
import { TabItem } from '../types';
import styled from 'styled-components';
import { DARK_GREEN, TEXT_GREY } from '../../../utils/colors';

const { Paragraph } = Typography;

const StyledCard = styled(Card)`
  width: 90%;
  height: 180px;
  display: inline-block;
  border-radius: 2px;
`;

const CenterRow = styled(Row)`
  text-align: center;
`;

const CardHeader = styled(Paragraph)`
  font-size: 14px;
  line-height: 12px;
  color: ${TEXT_GREY};
`;

const LargeText = styled(Paragraph)`
  display: inline-block;
  font-size: 20px;
  color: ${DARK_GREEN};
`;

const SmallText = styled(Paragraph)`
  font-size: 25px;
  color: ${DARK_GREEN};
`;

interface LeaderboardTabProps {
  tabItems: TabItem[];
  currentPage: number;
  itemsPerPage: number;
  activePanelKey?: number;
}

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  tabItems,
  currentPage,
  itemsPerPage,
}) => {
  return (
    <>
      <Row>
        <Col span={8}>
          <StyledCard>
            <LargeText>John Doe</LargeText>
            <CenterRow>
              <Col span={12}>
                <CardHeader>Trees Counted</CardHeader>
                <SmallText>100</SmallText>
              </Col>
              <Col span={12} style={{ textAlign: 'center' }}>
                <CardHeader>Overall Ranking</CardHeader>
                <SmallText>#1</SmallText>
              </Col>
            </CenterRow>
          </StyledCard>
        </Col>
        <Col span={16}>
          <LeaderboardPanels
            tabItems={tabItems}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </Col>
      </Row>
    </>
  );
};

export default LeaderboardTab;
