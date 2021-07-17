import {
  AsyncRequest,
  asyncRequestIsComplete,
} from '../../../utils/asyncRequest';
import {
  TeamResponse,
  TeamProps,
  GoalProps,
  GoalResponseJSON,
  TeamRole,
} from './types';

export const teamResponseRequestToTeamProps = (
  team: AsyncRequest<TeamResponse, any>,
): TeamProps => {
  if (asyncRequestIsComplete(team)) {
    return teamResponseToTeamProps(team.result);
  }
  return emptyTeam();
};

const teamResponseToTeamProps = (team: TeamResponse): TeamProps => {
  return {
    id: team.id,
    teamName: team.teamName,
    bio: team.bio,
    members: team.members,
    goals: mapGoalResponseJSONToGoalProps(team.goals),
  };
};

const mapGoalResponseJSONToGoalProps = (
  goals: GoalResponseJSON[],
): GoalProps[] => {
  return goals.map((goal) => {
    return {
      ...goal,
      id: goal.goalId,
      startDate: new Date(goal.startDate),
      completeBy: new Date(goal.completeBy),
      completionDate: !!goal.completeBy ? new Date(goal.completeBy) : undefined,
    };
  });
};

// In case the team request has not been completed.
// This is to prevent the TeamProps from being undefined
const emptyTeam: () => TeamProps = () => ({
  id: 0,
  teamName: '',
  bio: '',
  members: [],
  goals: [],
});

export const getTeamRole = (
  team: AsyncRequest<TeamResponse, any>,
  userId: number,
): TeamRole => {
  if (asyncRequestIsComplete(team)) {
    const member = team.result.members.find(
      (potentialMember) => potentialMember.userId === userId,
    );
    if (member) {
      return member.teamRole;
    }
    return TeamRole.NONE;
  }
  return TeamRole.NONE;
};
