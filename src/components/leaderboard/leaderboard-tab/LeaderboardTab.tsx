import * as React from 'react';
import { Collapse, Space, Typography, Col, Row } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { CollapseProps } from 'antd/lib/collapse/Collapse';
import { SpaceProps } from 'antd/lib/space/index';
import { BLACK, LIGHT_GREEN, WHITE } from '../../../colors';
import { LeaderboardItem } from '../ducks/types';
import styled from 'styled-components';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const LeaderBoardItemHeader = styled.span`
  text-align: center;
`;

const LeaderboardSpace = styled(Space)<SpaceProps>`
  width: 100%;
`;

const LeaderboardCollapse = styled(Collapse)<CollapseProps>`
  background-color: ${LIGHT_GREEN}80;
  border-radius: 0px;
`;

const LeaderboardItemName = styled(Paragraph)<ParagraphProps>`
  color: ${BLACK};
  display: inline;
  position: absolute;
  left: 57px;
  top: 19px;
  vertical-align: middle;
  line-height: 0px;
`;

const LeaderboardItemRank = styled(Paragraph)<ParagraphProps>`
  color: ${BLACK};
  display: inline;
  padding-right: 20px;
  vertical-align: middle;
  font-size: 20px;
  line-height: 0px;
`;

interface LeaderboardTabProps {
  tabItems: TabItem[];
  currentPage: number;
  itemsPerPage: number;
  activePanelKey?: number;
}

export interface TabItem {
  rank?: number;
  id: number;
  name: string; // for now, these are assumed to be unique
  rightSide: React.ReactNode;
  collapseContent?: React.ReactNode;
}

export const leaderboardItemsToTabItems = (
  leaderboardItems: LeaderboardItem[],
): TabItem[] => {
  return leaderboardItems.map((item) => {
    return {
      id: item.id,
      name: item.name,
      rightSide: item.blocksCounted,
    };
  });
};

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  tabItems,
  currentPage,
  itemsPerPage,
}) => {
  const itemsOnPage = tabItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <Row>
        <Col span={8}>The card</Col>
        <Col span={16}>
          {
            <LeaderboardSpace direction="vertical">
              {itemsOnPage.map((item, index) => {
                return (
                  <LeaderboardCollapse bordered={true}>
                    <Panel
                      key={item.name}
                      header={
                        <LeaderBoardItemHeader>
                          <LeaderboardItemRank>
                            {item.rank && item.rank}
                          </LeaderboardItemRank>
                          <LeaderboardItemName>{item.name}</LeaderboardItemName>
                        </LeaderBoardItemHeader>
                      }
                      extra={item.rightSide}
                      showArrow={false}
                      disabled={!item.collapseContent}
                    >
                      {item.collapseContent}
                    </Panel>
                  </LeaderboardCollapse>
                );
              })}
            </LeaderboardSpace>
          }
        </Col>
      </Row>
    </>
  );
};

export default LeaderboardTab;
