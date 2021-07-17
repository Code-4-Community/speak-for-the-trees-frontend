import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Collapse, List, Typography } from 'antd';
import { Routes } from '../../App';
import { TeamProps, TeamRole } from './ducks/types';
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
import { connect, useDispatch } from 'react-redux';
import { C4CState } from '../../store';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getTeam } from './ducks/thunks';
import { teamResponseRequestToTeamProps } from './ducks/selectors';
import ProtectedApiClient from '../../api/protectedApiClient';

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

interface TeamPageProps {
  readonly teamProps: TeamProps;
  readonly teamRequestKind: AsyncRequestKinds;
}

const TeamPage: React.FC<TeamPageProps> = ({ teamProps, teamRequestKind }) => {
  const dispatch = useDispatch();

  const { id } = useParams<{ id: string }>();
  const numId = +id;

  useEffect(() => {
    // The default tab is weekly
    dispatch(getTeam(numId));
  }, [dispatch, numId]);

  const applyToTeam = () => {
    ProtectedApiClient.applyToTeam(numId);
  };

  console.log(teamProps);

  return (
    <>
      {teamRequestKind === AsyncRequestKinds.Completed && (
        <TeamContainer>
          <ReturnButton to={Routes.AVAILABLE_TEAMS}>
            {`<`} Return to Teams
          </ReturnButton>
          <TeamHeaderContainer>
            <PageHeaderContainer>
              <PageHeader
                pageTitle={teamProps.teamName}
                pageSubtitle={teamProps.bio}
              />
            </PageHeaderContainer>
            <JoinButton type="primary" onClick={applyToTeam}>
              Join Team
            </JoinButton>
          </TeamHeaderContainer>

          <CenterDiv>
            <MemberContainer>
              <SectionHeader>TEAM MEMBERS</SectionHeader>
              <StyledMemberList
                dataSource={teamProps.members}
                itemLayout="vertical"
              >
                {teamProps.members.map((member) => {
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
                defaultActiveKey={teamProps.goals[0].id}
                expandIconPosition={'right'}
              >
                {teamProps.goals.map((item) => {
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
      )}
    </>
  );
};

const mapStateToProps = (state: C4CState): TeamPageProps => {
  return {
    teamProps: teamResponseRequestToTeamProps(state.teamState.team),
    teamRequestKind: state.teamState.team.kind,
  };
};

export default connect(mapStateToProps)(TeamPage);
