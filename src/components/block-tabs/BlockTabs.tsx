import React from 'react';
import { List, Tabs } from 'antd';
import styled from 'styled-components';
import { DARK_GREY } from '../../utils/colors';
import BlockCard from '../block-card/BlockCard';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  color: ${DARK_GREY};
`;

const ScrollableListContainer = styled.div`
  max-height: 57vh;
  overflow: auto;
`;

const StyledListItem = styled(List.Item)`
  padding: 3px;
`;

interface BlockProps {
  readonly block_id: number;
}

const sampleAllBlocksData: BlockProps[] = [
  { block_id: 1 },
  { block_id: 20 },
  { block_id: 321 },
  { block_id: 400 },
  { block_id: 542 },
  { block_id: 652 },
  { block_id: 715 },
  { block_id: 811 },
  { block_id: 910 },
  { block_id: 1041 },
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
              dataSource={sampleAllBlocksData}
              itemLayout="vertical"
              renderItem={(item) => (
                <StyledListItem>
                  <BlockCard id={item.block_id} reserved={false} />
                </StyledListItem>
              )}
            />
          </ScrollableListContainer>
        </TabPane>
        {/*
        <TabPane tab="Near Me" key="2">
        </TabPane>
        */}
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
