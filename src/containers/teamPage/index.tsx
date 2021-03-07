import React from 'react';
import styled from 'styled-components';
import { Button, Collapse, List, Typography } from 'antd';
import { Routes } from '../../App';
import { GoalProps, MemberProps, TeamProps, TeamRole } from './ducks/types';
import GoalInfo from '../../components/goalInfo';
import PageHeader from '../../components/pageHeader';
import TeamMember from '../../components/teamMember';
import { LinkButton } from '../../components/LinkButton';
import { getDateString } from '../../utils/stringFormat';
import {
  BLACK,
  DARK_GREEN,
  LIGHT_GREEN,
  MID_GREEN,
  WHITE,
} from '../../utils/colors';

const { Paragraph } = Typography;
const { Panel } = Collapse;

const TeamContainer = styled.div`
  padding: 70px 134px;
`;

const StyledLinkButton = styled(LinkButton)`
  width: 190px;
  height: 45px;
  margin-bottom: 20px;
  border-color: ${MID_GREEN};
  font-size: 18px;
  color: ${MID_GREEN};
`;

const TeamHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 80px;
`;

const PageHeaderContainer = styled.div`
  max-width: 600px;
`;

const JoinButton = styled(Button)`
  width: 125px;
  height: 45px;
  color: ${WHITE};
  background-color: ${MID_GREEN};
  font-size: 18px;
`;

const CenterDiv = styled.div`
  margin-top: -50px;
  display: flex;
  justify-content: space-between;
`;

const MemberContainer = styled.div`
  width: 45%;
`;

const GoalContainer = styled.div`
  width: 55%;
`;

const SectionHeader = styled(Paragraph)`
  font-size: 25px;
  font-weight: bold;
  line-height: 1;
  color: ${DARK_GREEN};
`;

const StyledMemberList = styled(List)`
  border-bottom: 0px;
`;

const LeaderboardCollapse = styled(Collapse)`
  color: ${BLACK};
  font-size: 15px;
`;

const BlackText = styled(Paragraph)`
  display: inline-block;
  color: ${BLACK};
  font-size: 15px;
  line-height: 0.5;
`;

const StyledPanel = styled(Panel)`
  min-height: 40px;
  margin-bottom: 10px;
  padding-left: 10px;
  background-color: ${LIGHT_GREEN}90;
  border: 0px;
`;

const Line = styled.div`
  height: 1px;
  width: 104%;
  margin: 0px -10px 10px -20px;
  display: block;
  background-color: ${WHITE};
`;

// dummy data
const sampleMemberData: MemberProps[] = [
  {
    user_id: 1,
    username: 'florisdobber',
    team_role: TeamRole.LEADER,
  },
  {
    user_id: 2,
    username: 'jackblanc',
    team_role: TeamRole.MEMBER,
  },
  {
    user_id: 3,
    username: 'atreecounter',
    team_role: TeamRole.NONE,
  },
  {
    user_id: 4,
    username: 'speakerofthetrees',
    team_role: TeamRole.PENDING,
  },
  {
    user_id: 5,
    username: 'vrushalitarte01',
    team_role: TeamRole.MEMBER,
  },
  {
    user_id: 6,
    username: 'willmt80',
    team_role: TeamRole.MEMBER,
  },
  {
    user_id: 7,
    username: 'apradhan12',
    team_role: TeamRole.MEMBER,
  },
  {
    user_id: 8,
    username: 'SofieDunt',
    team_role: TeamRole.MEMBER,
  },
];

const sampleGoalData: GoalProps[] = [
  {
    id: 1,
    goal: 50,
    progress: 5,
    start_date: new Date(2021, 0, 1),
    complete_by: new Date(2022, 0, 1),
    completion_date: null,
  },
  {
    id: 2,
    goal: 500,
    progress: 71,
    start_date: new Date(2021, 2, 20),
    complete_by: new Date(2021, 4, 21),
    completion_date: null,
  },
  {
    id: 3,
    goal: 10,
    progress: 10,
    start_date: new Date(2020, 5, 10),
    complete_by: new Date(2020, 7, 10),
    completion_date: new Date(2020, 6, 13),
  },
];

const sampleTeamData: TeamProps = {
  id: 1,
  name: 'Code4Community',
  bio: 'Short description about how cool of a team Code4Community is!',
  members: sampleMemberData,
  goals: sampleGoalData,
};

const TeamPage: React.FC = () => {
  const onClick = () => {
    // TODO: join team
  };

  return (
    <TeamContainer>
      <StyledLinkButton to={Routes.AVAILABLE_TEAMS}>
        {`<`} Return to Teams
      </StyledLinkButton>
      <TeamHeaderContainer>
        <PageHeaderContainer>
          <PageHeader
            pageTitle={sampleTeamData.name}
            pageSubtitle={sampleTeamData.bio}
          />
        </PageHeaderContainer>
        <JoinButton type="primary" onClick={onClick}>
          Join Team
        </JoinButton>
      </TeamHeaderContainer>

      <CenterDiv>
        <MemberContainer>
          <SectionHeader>TEAM MEMBERS</SectionHeader>
          <StyledMemberList
            dataSource={sampleTeamData.members}
            itemLayout="vertical"
          >
            {sampleTeamData.members.map((member) => {
              if (
                member.team_role === TeamRole.LEADER ||
                member.team_role === TeamRole.MEMBER
              ) {
                return (
                  <TeamMember
                    id={member.user_id}
                    team_role={member.team_role}
                    username={member.username}
                  />
                );
              }
              return <></>;
            })}
          </StyledMemberList>
        </MemberContainer>
        <GoalContainer>
          <SectionHeader>TEAM GOALS</SectionHeader>
          <LeaderboardCollapse
            bordered={false}
            defaultActiveKey={sampleTeamData.goals[0].id}
            expandIconPosition={'right'}
          >
            {sampleTeamData.goals.map((item) => {
              return (
                <StyledPanel
                  key={item.id}
                  header={<BlackText>Goal {item.id}</BlackText>}
                  extra={
                    item.completion_date == null && (
                      <BlackText>Incomplete</BlackText>
                    )
                  }
                >
                  <Line />
                  <GoalInfo
                    blockProgress={item.progress}
                    blockGoal={item.goal}
                    startDate={getDateString(item.start_date)}
                    targetDate={getDateString(item.complete_by)}
                  />
                </StyledPanel>
              );
            })}
          </LeaderboardCollapse>
        </GoalContainer>
      </CenterDiv>
    </TeamContainer>
  );
};

export default TeamPage;
