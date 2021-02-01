import React, { useEffect, useState } from 'react';
import LeaderboardTabs, {
  TabInfo,
} from '../../components/leaderboard/leaderboard-tabs/LeaderboardTabs';
import { C4CState } from '../../store';
import PageHeader from '../../components/pageheader/PageHeader';
import styled from 'styled-components';
import {
  UserLeaderboardWeeklyReducerState,
  UserLeaderboardMonthlyReducerState,
  UserLeaderboardYearlyReducerState,
  UserLeaderboardAllTimeReducerState,
} from './ducks/types';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getUsersLeaderboard } from './ducks/thunks';
import { LeaderboardPreviousDays } from '../../components/leaderboard/ducks/types';
import { leaderboardItemsToTabItems } from '../../components/leaderboard/leaderboard-tab/LeaderboardTab';

const LeaderboardContentContainer = styled.div`
  padding: 100px 134px;
`;

const LeaderboardContainer = styled.div`
  margin: 80px 0px 40px;
`;

interface VolunteerLeaderboardProps {
  readonly userLeaderboardItemsWeekly: UserLeaderboardWeeklyReducerState['userLeaderboardWeekly'];
  readonly userLeaderboardItemsMonthly: UserLeaderboardMonthlyReducerState['userLeaderboardMonthly'];
  readonly userLeaderboardItemsYearly: UserLeaderboardYearlyReducerState['userLeaderboardYearly'];
  readonly userLeaderboardItemsAllTime: UserLeaderboardAllTimeReducerState['userLeaderboardAllTime'];
}

const VolunteerLeaderboard: React.FC<VolunteerLeaderboardProps> = ({
  userLeaderboardItemsWeekly,
  userLeaderboardItemsMonthly,
  userLeaderboardItemsYearly,
  userLeaderboardItemsAllTime,
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
    dispatch(getUsersLeaderboard(LeaderboardPreviousDays.weekly));
    dispatch(getUsersLeaderboard(LeaderboardPreviousDays.monthly));
    dispatch(getUsersLeaderboard(LeaderboardPreviousDays.yearly));
    dispatch(getUsersLeaderboard(LeaderboardPreviousDays.allTime));
  }, [dispatch]);

  useEffect(() => {
    userLeaderboardItemsWeekly.kind === AsyncRequestKinds.Completed &&
      setWeeklyTab({
        ...weeklyTab,
        content: leaderboardItemsToTabItems(userLeaderboardItemsWeekly.result),
      });
  }, [userLeaderboardItemsWeekly, dispatch]);

  useEffect(() => {
    userLeaderboardItemsMonthly.kind === AsyncRequestKinds.Completed &&
      setMonthlyTab({
        ...monthlyTab,
        content: leaderboardItemsToTabItems(userLeaderboardItemsMonthly.result),
      });
  }, [userLeaderboardItemsMonthly, dispatch]);

  useEffect(() => {
    userLeaderboardItemsYearly.kind === AsyncRequestKinds.Completed &&
      setYearlyTab({
        ...yearlyTab,
        content: leaderboardItemsToTabItems(userLeaderboardItemsYearly.result),
      });
  }, [userLeaderboardItemsYearly, dispatch]);

  useEffect(() => {
    userLeaderboardItemsAllTime.kind === AsyncRequestKinds.Completed &&
      setAllTimeTab({
        ...allTimeTab,
        content: leaderboardItemsToTabItems(userLeaderboardItemsAllTime.result),
      });
  }, [userLeaderboardItemsAllTime, dispatch]);

  return (
    <LeaderboardContentContainer>
      <PageHeader
        pageTitle="Volunteer Leaderboard"
        pageSubtitle="Celebrate all the contributions of our Speak for the Trees volunteers!"
      />
      {userLeaderboardItemsWeekly.kind === AsyncRequestKinds.Completed &&
        userLeaderboardItemsMonthly.kind === AsyncRequestKinds.Completed &&
        userLeaderboardItemsYearly.kind === AsyncRequestKinds.Completed &&
        userLeaderboardItemsAllTime.kind === AsyncRequestKinds.Completed && (
          <LeaderboardContainer>
            <LeaderboardTabs
              tabs={[weeklyTab, monthlyTab, yearlyTab, allTimeTab]}
              itemsPerPage={4}
            />
          </LeaderboardContainer>
        )}
    </LeaderboardContentContainer>
  );
};

const mapStateToProps = (state: C4CState): VolunteerLeaderboardProps => {
  return {
    userLeaderboardItemsWeekly:
      state.userLeaderboardWeeklyState.userLeaderboardWeekly,
    userLeaderboardItemsMonthly:
      state.userLeaderboardMonthlyState.userLeaderboardMonthly,
    userLeaderboardItemsYearly:
      state.userLeaderboardYearlyState.userLeaderboardYearly,
    userLeaderboardItemsAllTime:
      state.userLeaderboardAllTimeState.userLeaderboardAllTime,
  };
};

export default connect(mapStateToProps)(VolunteerLeaderboard);
