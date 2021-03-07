import React, { useState } from 'react';
import LeaderboardSpace from '../../components/leaderboard/leaderboardSpace';
import { TabItem } from '../../components/leaderboard/types';
import { Pagination, Divider } from 'antd';
import PageHeader from '../../components/pageHeader';
import styled from 'styled-components';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

const ContentContainer = styled.div`
  padding: 100px 134px;
`;

const TeamsContainer = styled.div`
  margin: 80px 0px 40px;
`;

const TeamPagination = styled(Pagination)`
  display: flex;
  justify-content: flex-end;
`;

const TeamDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ArrowLink = styled(ArrowRightOutlined)`
  line-height: 0px;
  font-size: 20px;
`;

const dummy: TabItem[] = [
  {
    id: 1,
    name: 'team1',
    rightSide: (
      <Button type="text">
        <ArrowLink />
      </Button>
    ),
  },
  {
    id: 2,
    name: 'team2',
    rightSide: (
      <Button type="text">
        <ArrowLink />
      </Button>
    ),
  },
  {
    id: 3,
    name: 'team3',
    rightSide: (
      <Button type="text">
        <ArrowLink />
      </Button>
    ),
  },
];

const AvailableTeams: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <ContentContainer>
      <PageHeader
        pageTitle="Available Teams"
        pageSubtitle="Take a peak at the teams accepting new members!"
      />

      <TeamsContainer>
        <TeamPagination
          showSizeChanger={false}
          current={currentPage}
          onChange={setCurrentPage}
          total={50}
        />
        <TeamDivider />
        <LeaderboardSpace
          tabItems={dummy}
          itemsPerPage={2}
          currentPage={currentPage}
          large
        />
      </TeamsContainer>
    </ContentContainer>
  );
};

export default AvailableTeams;
