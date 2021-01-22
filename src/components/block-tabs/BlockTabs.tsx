import React from 'react';
import { List, Tabs } from 'antd';
import styled from 'styled-components';
import { DARKGREY } from '../../colors';
import BlockCard from '../block-card/BlockCard';

const { TabPane } = Tabs;

const StyledTabs = styled(Tabs)`
  color: ${DARKGREY};
`;

const ScrollableListContainer = styled.div`
  max-height: 57vh;
  overflow: auto;
`;

const StyledListItem = styled(List.Item)`
  padding: 3px;
`;

interface BlockProps {
  readonly blockId: number;
  readonly distanceToUser: number;
}

const sampleAllBlocksData: BlockProps[] = [
  { blockId: 1, distanceToUser: 0.1 },
  { blockId: 20, distanceToUser: 10 },
  { blockId: 321, distanceToUser: 1 },
  { blockId: 400, distanceToUser: 4.4 },
  { blockId: 542, distanceToUser: 52.2 },
  { blockId: 652, distanceToUser: 12.9 },
  { blockId: 715, distanceToUser: 12 },
  { blockId: 811, distanceToUser: 20.3 },
  { blockId: 910, distanceToUser: 14 },
  { blockId: 1041, distanceToUser: 0.9 },
];

const sampleUserReservedBlocks: BlockProps[] = [
  { blockId: 20, distanceToUser: 10 },
  { blockId: 400, distanceToUser: 4.4 },
  { blockId: 652, distanceToUser: 12.9 },
  { blockId: 910, distanceToUser: 14 },
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
                  <BlockCard
                    id={item.blockId}
                    distance={item.distanceToUser}
                    reserved={false}
                  />
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
                  <BlockCard
                    id={item.blockId}
                    distance={item.distanceToUser}
                    reserved={true}
                  />
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
