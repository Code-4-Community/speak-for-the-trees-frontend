import React, { useEffect, useState } from 'react';
import LeaderboardTabs, {
  TabInfo,
} from '../../components/leaderboard/leaderboard-tabs/LeaderboardTabs';
import { C4CState } from '../../store';
import PageHeader from '../../components/pageheader/PageHeader';
import styled from 'styled-components';
import {
  TeamLeaderboardWeeklyReducerState,
  TeamLeaderboardMonthlyReducerState,
  TeamLeaderboardYearlyReducerState,
  TeamLeaderboardAllTimeReducerState,
} from './ducks/types';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getTeamsLeaderboard } from './ducks/thunks';
import { LeaderboardPreviousDays } from '../../components/leaderboard/ducks/types';
import { leaderboardItemsToTabItems } from '../../components/leaderboard/leaderboard-tab/LeaderboardTab';

const LeaderboardContentContainer = styled.div`
  padding: 100px 134px;
`;

const LeaderboardContainer = styled.div`
  margin: 80px 0px 40px;
`;

interface TeamLeaderboardProps {
  readonly teamLeaderboardItemsWeekly: TeamLeaderboardWeeklyReducerState['teamLeaderboardWeekly'];
  readonly teamLeaderboardItemsMonthly: TeamLeaderboardMonthlyReducerState['teamLeaderboardMonthly'];
  readonly teamLeaderboardItemsYearly: TeamLeaderboardYearlyReducerState['teamLeaderboardYearly'];
  readonly teamLeaderboardItemsAllTime: TeamLeaderboardAllTimeReducerState['teamLeaderboardAllTime'];
}

const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({
  teamLeaderboardItemsWeekly,
  teamLeaderboardItemsMonthly,
  teamLeaderboardItemsYearly,
  teamLeaderboardItemsAllTime,
}) => {
  const dispatch = useDispatch();

  const [weeklyTab, setWeeklyTab] = useState<TabInfo>({
    name: 'Weekly',
    content: [],
  });
  const [monthlyTab, setMonthlyTab] = useState<TabInfo>({
    name: 'Monthly',
    content: [],
  });
  const [yearlyTab, setYearlyTab] = useState<TabInfo>({
    name: 'Yearly',
    content: [],
  });
  const [allTimeTab, setAllTimeTab] = useState<TabInfo>({
    name: 'All Time',
    content: [],
  });

  useEffect(() => {
    dispatch(getTeamsLeaderboard(LeaderboardPreviousDays.weekly));
    dispatch(getTeamsLeaderboard(LeaderboardPreviousDays.monthly));
    dispatch(getTeamsLeaderboard(LeaderboardPreviousDays.yearly));
    dispatch(getTeamsLeaderboard(LeaderboardPreviousDays.allTime));
  }, []);

  useEffect(() => {
    teamLeaderboardItemsWeekly.kind === AsyncRequestKinds.Completed &&
      setWeeklyTab({
        ...weeklyTab,
        content: leaderboardItemsToTabItems(teamLeaderboardItemsWeekly.result),
      });
  }, [teamLeaderboardItemsWeekly]);

  useEffect(() => {
    teamLeaderboardItemsMonthly.kind === AsyncRequestKinds.Completed &&
      setMonthlyTab({
        ...monthlyTab,
        content: leaderboardItemsToTabItems(teamLeaderboardItemsMonthly.result),
      });
  }, [teamLeaderboardItemsMonthly]);

  useEffect(() => {
    teamLeaderboardItemsYearly.kind === AsyncRequestKinds.Completed &&
      setYearlyTab({
        ...yearlyTab,
        content: leaderboardItemsToTabItems(teamLeaderboardItemsYearly.result),
      });
  }, [teamLeaderboardItemsYearly]);

  useEffect(() => {
    teamLeaderboardItemsAllTime.kind === AsyncRequestKinds.Completed &&
      setAllTimeTab({
        ...weeklyTab,
        content: leaderboardItemsToTabItems(teamLeaderboardItemsAllTime.result),
      });
  }, [teamLeaderboardItemsAllTime]);

  return (
    <LeaderboardContentContainer>
      <PageHeader
        pageTitle="Team Leaderboard"
        pageSubtitle="Let’s celebrate your team reaching for its goals!"
      />

      <LeaderboardContainer>
        {teamLeaderboardItemsWeekly.kind === AsyncRequestKinds.Completed &&
          teamLeaderboardItemsMonthly.kind === AsyncRequestKinds.Completed &&
          teamLeaderboardItemsYearly.kind === AsyncRequestKinds.Completed &&
          teamLeaderboardItemsAllTime.kind === AsyncRequestKinds.Completed && (
            <LeaderboardTabs
              tabs={[weeklyTab, monthlyTab, yearlyTab, allTimeTab]}
              itemsPerPage={4}
            />
          )}
      </LeaderboardContainer>
    </LeaderboardContentContainer>
  );
};

const mapStateToProps = (state: C4CState): TeamLeaderboardProps => {
  return {
    teamLeaderboardItemsWeekly:
      state.teamLeaderboardWeeklyState.teamLeaderboardWeekly,
    teamLeaderboardItemsMonthly:
      state.teamLeaderboardMonthlyState.teamLeaderboardMonthly,
    teamLeaderboardItemsYearly:
      state.teamLeaderboardYearlyState.teamLeaderboardYearly,
    teamLeaderboardItemsAllTime:
      state.teamLeaderboardAllTimeState.teamLeaderboardAllTime,
  };
};

export default connect(mapStateToProps)(TeamLeaderboard);
