import React from 'react';
import LeaderboardTabs, {
  TabInfo,
} from '../../components/leaderboard/leaderboardTabs';
import PageHeader from '../../components/pageHeader';
import { Button } from 'antd';
import styled from 'styled-components';

// Placeholders
const dummyTabs: TabInfo[] = [
  {
    name: 'one',
    content: [
      {
        rank: 1,
        name: 'Jack',
        rightSide: 100,
        collapseContent: 'hello',
      },
      {
        name: 'Floris',
        rightSide: <Button style={{ height: 30 }}>Hello</Button>,
      },
      {
        name: 'Breanna',
        rightSide: 80,
      },
      {
        name: 'Aaron',
        rightSide: 80,
      },
      {
        name: 'Sophie',
        rightSide: 80,
      },
      {
        name: 'Owen',
        rightSide: 80,
      },
      {
        name: 'Will',
        rightSide: 7,
      },
    ],
  },
];

const LeaderboardContentContainer = styled.div`
  padding: 100px 134px;
`;

const LeaderboardContainer = styled.div`
  margin: 80px 0px 40px;
`;

const VolunteerLeaderboard: React.FC = () => {
  return (
    <LeaderboardContentContainer>
      <PageHeader
        pageTitle="Volunteer Leaderboard"
        pageSubtitle="Celebrate all the contributions of our Speak for the Trees volunteers!"
      />

      <LeaderboardContainer>
        <LeaderboardTabs tabs={dummyTabs} itemsPerPage={4} />
      </LeaderboardContainer>
    </LeaderboardContentContainer>
  );
};

export default VolunteerLeaderboard;
