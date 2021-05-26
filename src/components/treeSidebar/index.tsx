import React from 'react';
import { List } from 'antd';
import styled from 'styled-components';
import TreeCard from '../treeCard';
import { SiteFeaturePropertiesResponse } from '../mapPageComponents/ducks/types';

const ScrollableListContainer = styled.div`
  max-height: 57vh;
  overflow: auto;
`;

const StyledListItem = styled(List.Item)`
  padding: 3px;
`;

interface TreeSidebarProps {
  readonly mySites: SiteFeaturePropertiesResponse[];
}

const BlockTabs: React.FC<TreeSidebarProps> = ({ mySites }) => {
  return (
    <>
      <ScrollableListContainer>
        <List
          dataSource={mySites}
          itemLayout="vertical"
          renderItem={(item) => (
            <StyledListItem>
              <TreeCard site={item} />
            </StyledListItem>
          )}
        />
      </ScrollableListContainer>
    </>
  );
};

export default BlockTabs;
