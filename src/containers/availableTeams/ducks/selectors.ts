import {
  AsyncRequest,
  asyncRequestIsComplete,
} from '../../../utils/asyncRequest';
import { AvailableTeam } from './types';
import { TabItem } from '../../../components/leaderboard/types';

export const availableTeamsToTabItems = (
  availableTeams: AsyncRequest<AvailableTeam[], any>,
): TabItem[] => {
  if (asyncRequestIsComplete(availableTeams)) {
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
