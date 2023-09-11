import * as React from 'react';
import Col from 'antd/es/col';
import Row from 'antd/es/row';
import LeaderboardPanels from '../leaderboardSpace';
import { TabItem } from '../types';

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
        <Col span={8}>The card</Col>
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
