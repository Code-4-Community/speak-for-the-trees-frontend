import { AsyncRequest, AsyncRequestKinds } from '../../../utils/asyncRequest';
import { TeamLeaderboardItem } from './types';
import { TabItem } from '../../../components/leaderboard/types';

export const mapTeamsToTabItems = (
  items: AsyncRequest<TeamLeaderboardItem[], any>,
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
