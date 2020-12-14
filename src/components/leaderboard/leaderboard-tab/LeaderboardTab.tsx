import * as React from 'react';
import { Collapse, Typography, Col, Row } from 'antd';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { CollapsePanelProps } from 'antd/lib/collapse/CollapsePanel';
import { BLACK, LIGHT_GREEN } from '../../../colors';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

const LeaderBoardItemHeader = styled.span`
  text-align: center;
`;

const LeaderboardPanel = styled(Collapse.Panel)<CollapsePanelProps>`
  background-color: ${LIGHT_GREEN}80;
  margin-bottom: 10px;
  boarder-radius: 0px;
  cursor: auto;
`;

const LeaderboardItemName = styled(Paragraph)<ParagraphProps>`
  color: ${BLACK};
  display: inline;
  vertical-align: middle;
  line-height: 0px;
`;

const LeaderboardItemRank = styled(Paragraph)<ParagraphProps>`
  color: ${BLACK};
  display: inline;
  padding-right: 20px;
  vertical-align: middle;
  font-size: 24px;
  line-height: 0px;
`;

type LeaderboardTabProps = {
  tabItems: LeaderboardItem[];
  currentPage: number;
  itemsPerPage: number;
};

export type LeaderboardItem = {
  rank?: number;
  name: string;
  rightSide: React.ReactNode;
  collapseContent?: React.ReactNode;
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
  const panels = getPanels(itemsOnPage);

  return (
    <>
      <Row>
        <Col span={8}>The card</Col>
        <Col span={16}>{panels}</Col>
      </Row>
    </>
  );
};

/**
 * Creates the antd Panel objects from the given items
 * @param items
 */
function getPanels(items: LeaderboardItem[]): React.ReactNode {
  return (
    <Collapse bordered={false}>
      {items.map((item, index) => {
        return (
          <LeaderboardPanel
            key={index}
            header={getPanelHeader(item.name, item.rank)}
            extra={item.rightSide}
            showArrow={false}
            disabled={!item.collapseContent} // is disabled if collapse content does not exist
          >
            {item.collapseContent}
          </LeaderboardPanel>
        );
      })}
    </Collapse>
  );
}

function getPanelHeader(name: string, rank?: number): React.ReactNode {
  return (
    <LeaderBoardItemHeader>
      <LeaderboardItemRank>{rank && rank}</LeaderboardItemRank>
      <LeaderboardItemName>{name}</LeaderboardItemName>
    </LeaderBoardItemHeader>
  );
}

export default LeaderboardTab;
