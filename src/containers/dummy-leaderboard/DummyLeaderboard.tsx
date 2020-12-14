import React from 'react';
import LeaderboardTabs, { TabInfo } from '../../components/leaderboard/leaderboard-tabs/LeaderboardTabs';
import { LeaderboardItem } from '../../components/leaderboard/leaderboard-tab/LeaderboardTab';

const dummyTabs: TabInfo[] = [
  {
    name: "one",
    content: [
      {
        rank: 1,
        name: "Jack",
        rightSide: 100,
        collapseContent: "hello"
      },
      {
        name: "Floris",
        rightSide: 90
      },
      {
        name: "Breanna",
        rightSide: 80
      },
      {
        name: "Sophie",
        rightSide: 80
      },
      {
        name: "Owen",
        rightSide: 80
      },
      {
        name: "Will",
        rightSide: 7
      },
    ]
  }
];

const DummyLeaderboard: React.FC = () => {
  return (
    <LeaderboardTabs
      tabs= {dummyTabs}
      itemsPerPage={4}
    />
  )
}

export default DummyLeaderboard;