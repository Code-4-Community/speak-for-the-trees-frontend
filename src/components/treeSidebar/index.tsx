import React from 'react';
import { List } from 'antd';
import { StyledListItem } from '../themedComponents';
import TreeCard from '../treeCard';
import { SiteFeaturePropertiesResponse } from '../mapComponents/ducks/types';
import { useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';

interface TreeSidebarProps {
  readonly mySites: SiteFeaturePropertiesResponse[];
}

const TreeSidebar: React.FC<TreeSidebarProps> = ({ mySites }) => {
  const { t } = useTranslation(n(site, 'myTrees'), { nsMode: 'fallback' });

  return (
    <>
      <List
        dataSource={mySites}
        itemLayout="vertical"
        locale={{ emptyText: t('treeCard.empty') }}
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
