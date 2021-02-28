import { AsyncRequest, AsyncRequestKinds } from '../../../utils/asyncRequest';
import { VolunteerLeaderboardItem } from './types';
import { TabItem } from '../../../components/leaderboard/leaderboardSpace';

export const mapVolunteersToTabItems = (
  items: AsyncRequest<VolunteerLeaderboardItem[], any>,
): TabItem[] => {
  if (items.kind === AsyncRequestKinds.Completed) {
    return items.result.map((item) => {
      return {
        id: item.id,
        name: item.name,
        rightSide: item.blocksCounted,
      };
    });
  }
  return [];
};
