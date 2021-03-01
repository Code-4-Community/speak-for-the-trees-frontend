import * as React from 'react';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { SpaceProps } from 'antd/lib/space/index';
import { BLACK, LIGHT_GREEN } from '../../../utils/colors';
import styled from 'styled-components';
import { Collapse, Space, Typography } from 'antd';

const { Panel } = Collapse;
const { Paragraph } = Typography;

interface LeaderboardStyleProps {
  large?: boolean;
}

const LeaderboardSpace = styled(Space)<SpaceProps>`
  width: 100%;
`;

const LeaderboardCollapse = styled(Collapse)`
  background-color: ${LIGHT_GREEN}80;
  border-radius: 0px;
  ${(props: LeaderboardStyleProps) => props.large && 'padding: 15px 0px 10px'};
`;

const LeaderboardItemName = styled(Paragraph)`
  color: ${BLACK};
  display: inline-block;
  line-height: 0px;
  ${(props: LeaderboardStyleProps) => props.large && 'font-size: 20px; font-weight: bold;'};
`;

const LeaderboardRankContainer = styled.span`
  width: 50px;
  display: inline-block;
`;

const LeaderboardItemRank = styled(Paragraph)<ParagraphProps>`
  color: ${BLACK};
  display: inline;
  vertical-align: middle;
  text-align: center;
  font-size: 20px;
  line-height: 0px;
`;

export interface TabItem {
  rank?: number;
  id: number;
  name: string; // for now, these are assumed to be unique
  rightSide: React.ReactNode;
  collapseContent?: React.ReactNode;
}

interface LeaderboardSpaceProps {
  tabItems: TabItem[];
  currentPage: number;
  itemsPerPage: number;
  activePanelKey?: number;
  large?: boolean;
}

const LeaderboardPanels: React.FC<LeaderboardSpaceProps> = ({
  tabItems,
  currentPage,
  itemsPerPage,
  large,
}) => {
  const itemsOnPage = tabItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <LeaderboardSpace direction="vertical" size={large ? 22 : 'small'}>
      {itemsOnPage.map((item) => {
        return (
          <LeaderboardCollapse bordered={true} key={item.name} large={large}>
            <Panel
              key={item.name}
              header={
                <>
                  <LeaderboardRankContainer>
                    <LeaderboardItemRank>
                      {item.rank && item.rank}
                    </LeaderboardItemRank>
                  </LeaderboardRankContainer>
                  <LeaderboardItemName large={large}>
                    {item.name}
                  </LeaderboardItemName>
                </>
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
  );
};

export default LeaderboardPanels;
