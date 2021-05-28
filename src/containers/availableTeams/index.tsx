import React, { useState } from 'react';
import LeaderboardSpace from '../../components/leaderboard/leaderboardSpace';
import { TabItem } from '../../components/leaderboard/types';
import { ParameterizedRouteBases, Routes } from '../../App';
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
  margin: 80px auto auto;
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

const AvailableTeams: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dummy: TabItem[] = [
    {
      id: 1,
      name: 'Code4Community',
      rightSide: (
        <LinkButton type="text" to={`${ParameterizedRouteBases.TEAM}1`}>
          <ArrowLink />
        </LinkButton>
      ),
    },
    {
      id: 2,
      name: 'NortheasternForestry',
      rightSide: (
        <LinkButton type="text">
          <ArrowLink />
        </LinkButton>
      ),
    },
    {
      id: 3,
      name: 'Team Birch',
      rightSide: (
        <LinkButton type="text">
          <ArrowLink />
        </LinkButton>
      ),
    },
    {
      id: 4,
      name: 'Pine Team',
      rightSide: (
        <LinkButton type="text">
          <ArrowLink />
        </LinkButton>
      ),
    },
    {
      id: 5,
      name: 'Team Maple',
      rightSide: (
        <LinkButton type="text">
          <ArrowLink />
        </LinkButton>
      ),
    },
  ];

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
            pageSize={4}
            total={5}
          />
          <TeamDivider />
          <LeaderboardSpace
            tabItems={dummy}
            itemsPerPage={4}
            currentPage={currentPage}
            large
          />
        </TeamsContainer>
      </ContentContainer>
    </PageLayout>
  );
};

export default AvailableTeams;
