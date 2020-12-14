import React from 'react';
import LeaderboardTabs, { TabInfo } from '../../components/leaderboard/leaderboard-tabs/LeaderboardTabs';
import { LeaderboardItem } from '../../components/leaderboard/leaderboard-tab/LeaderboardTab';

const dummyTabs: TabInfo[] = [
  {
    name: "one",
    content: [
      {
        name: "Jack",
        rightSide: 100
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
        rightSide: 70
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