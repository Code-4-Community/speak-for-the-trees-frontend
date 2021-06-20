import React from 'react';
import { List, Tabs } from 'antd';
import styled from 'styled-components';
import { StyledListItem, ScrollableListContainer } from '../themedComponents';
import { DARK_GREY } from '../../utils/colors';
import BlockCard from '../blockCard';
import { blocksList } from '../../assets/content';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  color: ${DARK_GREY};
  max-height: 55vh;
`;

interface BlockProps {
  readonly block_id: number;
}

const sampleAllBlocksData: BlockProps[] = [
  { block_id: 1714 },
  { block_id: 5142 },
  { block_id: 1249 },
  { block_id: 1250 },
  { block_id: 3726 },
  { block_id: 3725 },
  { block_id: 3715 },
  { block_id: 1732 },
  { block_id: 1735 },
  { block_id: 3727 },
  { block_id: 2194 },
  { block_id: 2195 },
  { block_id: 4992 },
  { block_id: 4990 },
  { block_id: 2942 },
  { block_id: 2936 },
  { block_id: 5494 },
  { block_id: 2205 },
];

const sampleUserReservedBlocks: BlockProps[] = [
  { block_id: 20 },
  { block_id: 400 },
  { block_id: 652 },
  { block_id: 910 },
];

const BlockTabs: React.FC = () => {
  return (
    <>
      <StyledTabs defaultActiveKey="1" type="card">
        <TabPane tab="All Blocks" key="1">
          <ScrollableListContainer>
            <List
              dataSource={blocksList}
              itemLayout="vertical"
              renderItem={(item) => (
                <StyledListItem>
                  <BlockCard id={item.block_id} reserved={false} />
                </StyledListItem>
              )}
            />
          </ScrollableListContainer>
        </TabPane>

        <TabPane tab="Near Me" key="2"></TabPane>

        <TabPane tab="Reservations" key="3">
          <ScrollableListContainer>
            <List
              dataSource={sampleUserReservedBlocks}
              itemLayout="vertical"
              renderItem={(item) => (
                <StyledListItem>
                  <BlockCard id={item.block_id} reserved={true} />
                </StyledListItem>
              )}
            />
          </ScrollableListContainer>
        </TabPane>
      </StyledTabs>
    </>
  );
};

export default BlockTabs;
