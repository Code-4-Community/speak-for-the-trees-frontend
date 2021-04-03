import { AsyncRequest, asyncRequestIsComplete} from '../../../utils/asyncRequest';
import { TeamResponse, TeamProps, GoalProps, GoalResponseJSON } from './types';

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
    name: team.name,
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
      completionDate: !!goal.completeBy ? new Date(goal.completeBy) : null,
    };
  });
};

// In case the team request has not been completed.
// This is to prevent the TeamProps from being undefined
const emptyTeam: () => TeamProps = () => ({
  id: 0,
  name: '',
  bio: '',
  members: [],
  goals: [],
});
