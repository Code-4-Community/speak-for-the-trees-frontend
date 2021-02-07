import * as React from 'react';
import { Typography, Tabs, Pagination } from 'antd';
import LeaderboardTab, { TabItem } from '../leaderboard-tab/LeaderboardTab';
import { LeaderboardItem } from '../ducks/types';
import { tabToDays } from '../constants';
import { LEADERBOARD_DAYS, LEADERBOARD_TABS } from '../constants';

export interface TabInfo {
  name: string;
  content: TabItem[];
}

interface LeaderboardTabsProps {
  items: LeaderboardItem[];
  tabNames: string[]
  currentTab: string;
  itemsPerPage: number;
  onChangeTimeTab: (tab: string, days: number) => void;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({
  items,
  tabNames,
  currentTab,
  itemsPerPage,
  onChangeTimeTab
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  const onChangePage = (page: number): void => setCurrentPage(page);
  const onChangeTab = (tab: string): void => { 
    const days = tabToDays(tab);
    onChangeTimeTab(tab, days);
  }

  return (
    <Tabs
      type="card"
      defaultActiveKey={currentTab}
      onChange={onChangeTab}
      tabBarExtraContent={
        <Pagination
          showSizeChanger={false}
          current={currentPage}
          onChange={onChangePage}
          total={50}
        />
      }
    >
      {tabNames.map((name) => {
        return (
          <Tabs.TabPane 
            tab={name} 
            key={name}
          >
            <LeaderboardTab
              tabItems={items}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
};

export default LeaderboardTabs;
