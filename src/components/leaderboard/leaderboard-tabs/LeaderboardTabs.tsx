import * as React from 'react';
import { Typography, Tabs, Pagination } from 'antd';
import LeaderboardTab, { LeaderboardItem  } from '../leaderboard-tab/LeaderboardTab';

export type TabInfo = {
  name: string,
  content: LeaderboardItem[]
}

type LeaderboardTabsProps = {
  tabs: TabInfo[],
  defaultTab?: string,
  itemsPerPage: number,
}

const LeaderboardTabs: React.FC<LeaderboardTabsProps> = ({ tabs, defaultTab, itemsPerPage }) => {

  const [ currentPage, setCurrentPage ] = React.useState<number>(1);
  const [ currentTab, setCurrentTab ] = React.useState<string>(defaultTab || tabs[0].name);

  const onChangePage = (page: number): void => setCurrentPage(page);
  const onChangeTab = (tab: string): void => setCurrentTab(tab);

  return (
    <Tabs 
      type="card"
      activeKey={ currentTab }
      onChange={ onChangeTab }
      tabBarExtraContent={
        <Pagination 
          current={ currentPage }
          onChange= { onChangePage }
        />
      }
    >
      {
        tabs.map((tabInfo, key) => {
          return <Tabs.TabPane 
            tab={ tabInfo.content } 
            key={ key }
          >
            <LeaderboardTab
              tabItems={ tabInfo.content }
              currentPage={ currentPage }
              itemsPerPage={ itemsPerPage }
            />
          </Tabs.TabPane>
        })
      }
    </Tabs>  
  );
}

export default LeaderboardTabs;
