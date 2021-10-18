import React from 'react';
import { List } from 'antd';
import { StyledListItem } from '../themedComponents';
import TreeCard from '../treeCard';
import { SiteFeaturePropertiesResponse } from '../mapPageComponents/ducks/types';

interface TreeSidebarProps {
  readonly mySites: SiteFeaturePropertiesResponse[];
}

const TreeSidebar: React.FC<TreeSidebarProps> = ({ mySites }) => {
  return (
    <>
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
    </>
  );
};

export default TreeSidebar;
