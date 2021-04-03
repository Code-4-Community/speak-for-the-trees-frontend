import React from 'react';
import styled from 'styled-components';
import { Button, Collapse, List, Typography } from 'antd';
import { Routes } from '../../App';
import { GoalProps, MemberProps, TeamProps, TeamRole } from './ducks/types';
import GoalInfo from '../../components/goalInfo';
import PageHeader from '../../components/pageHeader';
import TeamMember from '../../components/teamMember';
import ReturnButton from '../../components/returnButton';
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
    userId: 1,
    username: 'florisdobber',
    teamRole: TeamRole.LEADER,
  },
  {
    userId: 2,
    username: 'jackblanc',
    teamRole: TeamRole.MEMBER,
  },
  {
    userId: 3,
    username: 'atreecounter',
    teamRole: TeamRole.NONE,
  },
  {
    userId: 4,
    username: 'speakerofthetrees',
    teamRole: TeamRole.PENDING,
  },
  {
    userId: 5,
    username: 'vrushalitarte01',
    teamRole: TeamRole.MEMBER,
  },
  {
    userId: 6,
    username: 'willmt80',
    teamRole: TeamRole.MEMBER,
  },
  {
    userId: 7,
    username: 'apradhan12',
    teamRole: TeamRole.MEMBER,
  },
  {
    userId: 8,
    username: 'SofieDunt',
    teamRole: TeamRole.MEMBER,
  },
];

const sampleGoalData: GoalProps[] = [
  {
    id: 1,
    goal: 50,
    progress: 5,
    startDate: new Date(2021, 0, 1),
    completeBy: new Date(2022, 0, 1),
  },
  {
    id: 2,
    goal: 500,
    progress: 71,
    startDate: new Date(2021, 2, 20),
    completeBy: new Date(2021, 4, 21),
  },
  {
    id: 3,
    goal: 10,
    progress: 10,
    startDate: new Date(2020, 5, 10),
    completeBy: new Date(2020, 7, 10),
    completionDate: new Date(2020, 6, 13),
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
      <ReturnButton to={Routes.AVAILABLE_TEAMS}>
        {`<`} Return to Teams
      </ReturnButton>
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
                member.teamRole === TeamRole.LEADER ||
                member.teamRole === TeamRole.MEMBER
              ) {
                return (
                  <TeamMember
                    id={member.userId}
                    teamRole={member.teamRole}
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
                    item.completionDate == null && (
                      <BlackText>Incomplete</BlackText>
                    )
                  }
                >
                  <Line />
                  <GoalInfo
                    blockProgress={item.progress}
                    blockGoal={item.goal}
                    startDate={getDateString(item.startDate)}
                    targetDate={getDateString(item.completeBy)}
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
