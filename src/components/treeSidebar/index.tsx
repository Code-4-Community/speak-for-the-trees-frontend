import React from 'react';
import { List } from 'antd';
import { StyledListItem, ScrollableListContainer } from '../themedComponents';
import TreeCard from '../treeCard';
import { SiteFeaturePropertiesResponse } from '../mapPageComponents/ducks/types';

interface TreeSidebarProps {
  readonly mySites: SiteFeaturePropertiesResponse[];
}

const TreeSidebar: React.FC<TreeSidebarProps> = ({ mySites }) => {
  return (
    <>
      <ScrollableListContainer>
        <List
          dataSource={mySites}
          itemLayout="vertical"
          locale={{ emptyText: 'No Trees Adopted' }}
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

export default TreeSidebar;
