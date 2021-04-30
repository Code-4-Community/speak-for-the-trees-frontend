import React, { useState } from 'react';
import LeaderboardSpace from '../../components/leaderboard/leaderboardSpace';
import { TabItem } from '../../components/leaderboard/types';
import { Routes } from '../../App';
import { Pagination, Divider } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import ReturnButton from '../../components/returnButton';
import styled from 'styled-components';
import { LinkButton } from '../../components/linkButton';
import { ArrowRightOutlined } from '@ant-design/icons';
import { TEAMS_HEADER, TEAMS_TITLE } from '../../assets/content';

const ContentContainer = styled.div`
  width: 80vw;
  margin: 100px auto auto;
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
      <LinkButton type="text">
        <ArrowLink />
      </LinkButton>
    ),
  },
  {
    id: 2,
    name: 'team2',
    rightSide: (
      <LinkButton type="text">
        <ArrowLink />
      </LinkButton>
    ),
  },
  {
    id: 3,
    name: 'team3',
    rightSide: (
      <LinkButton type="text">
        <ArrowLink />
      </LinkButton>
    ),
  },
];

const AvailableTeams: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <PageLayout>
      <ContentContainer>
        <ReturnButton to={Routes.HOME}>{`<`} Return to Dashboard</ReturnButton>
        <PageHeader pageTitle={TEAMS_TITLE} pageSubtitle={TEAMS_HEADER} />

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
    </PageLayout>
  );
};

export default AvailableTeams;
