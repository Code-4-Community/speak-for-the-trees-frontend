import * as React from 'react';
import { ParagraphProps } from 'antd/lib/typography/Paragraph';
import { BLACK, LIGHT_GREEN } from '../../../utils/colors';
import styled from 'styled-components';
import { Collapse, Typography } from 'antd';
import { TabItem } from '../types';
import { FullWidthSpace } from '../../themedComponents';

interface LeaderboardStyleProps {
  large?: boolean;
}

const LeaderboardCollapse = styled(Collapse)`
  background-color: ${LIGHT_GREEN}80;
  border-radius: 0px;
  ${({ large }: LeaderboardStyleProps) => large && 'padding: 15px 0px 10px'};
`;

const LeaderboardItemName = styled(Typography.Paragraph)`
  color: ${BLACK};
  display: inline-block;
  line-height: 0px;
  ${({ large }: LeaderboardStyleProps) =>
    large && 'font-size: 20px; font-weight: bold;'};
`;

const LeaderboardRankContainer = styled.span`
  width: 50px;
  display: inline-block;
`;

const LeaderboardItemRank = styled(Typography.Paragraph)<ParagraphProps>`
  color: ${BLACK};
  display: inline;
  vertical-align: middle;
  text-align: center;
  font-size: 20px;
  line-height: 0px;
`;

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
  const itemsOnPage: TabItem[] = tabItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <FullWidthSpace direction="vertical" size={large ? 'large' : 'small'}>
      {itemsOnPage.map((item) => (
        <LeaderboardCollapse bordered={true} key={item.name} large={large}>
          <Collapse.Panel
            key={item.id}
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
          </Collapse.Panel>
        </LeaderboardCollapse>
      ))}
    </FullWidthSpace>
  );
};

export default LeaderboardPanels;
