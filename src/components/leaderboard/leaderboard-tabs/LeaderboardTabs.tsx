import * as React from 'react';
import { Tabs, Pagination } from 'antd';
import LeaderboardTab, {
  LeaderboardItem,
} from '../leaderboard-tab/LeaderboardTab';

export interface TabInfo {
  name: string;
  content: LeaderboardItem[];
}

interface LeaderboardTabsProps {
  tabs: TabInfo[];
  defaultTab?: string;
  itemsPerPage: number;
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({
  tabs,
  defaultTab,
  itemsPerPage,
}) => {
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [currentTab, setCurrentTab] = React.useState<string>(
    defaultTab ? defaultTab : tabs[0].name,
  );

  const onChangePage = (page: number): void => setCurrentPage(page);
  const onChangeTab = (tab: string): void => setCurrentTab(tab);

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
      {tabs.map((tabInfo, key) => {
        return (
          <Tabs.TabPane tab={tabInfo.name} key={key}>
            <LeaderboardTab
              tabItems={tabInfo.content}
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
