import { AsyncRequest, AsyncRequestKinds } from '../../../utils/asyncRequest';
import { AvailableTeam } from './types';
import { TabItem } from '../../../components/leaderboard/types';

export const availableTeamsToTabItems = (
  availableTeams: AsyncRequest<AvailableTeam[], any>,
): TabItem[] => {
  if (availableTeams.kind === AsyncRequestKinds.Completed) {
    return availableTeams.result.map((team) => {
      return {
        id: team.id,
        name: team.name,
        rightSide: '',
      };
    });
  }
  return [];
};
