import React, { useEffect, useState } from 'react';
import LeaderboardTabs, {
  TabInfo,
} from '../../components/leaderboard/leaderboard-tabs/LeaderboardTabs';
import { C4CState } from '../../store';
import PageHeader from '../../components/pageheader/PageHeader';
import styled from 'styled-components';
import { UserLeaderboardReducerState } from './ducks/types';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getUsersLeaderboard } from './ducks/thunks';
import {
  LEADERBOARD_DAYS,
  LEADERBOARD_TABS,
} from '../../components/leaderboard/constants';

const LeaderboardContentContainer = styled.div`
  padding: 100px 134px;
`;

const LeaderboardContainer = styled.div`
  margin: 80px 0px 40px;
`;

interface VolunteerLeaderboardProps {
  readonly userLeaderboardItems: UserLeaderboardReducerState['userLeaderboard'];
}

const VolunteerLeaderboard: React.FC<VolunteerLeaderboardProps> = ({
  userLeaderboardItems,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // default
    dispatch(getUsersLeaderboard(LEADERBOARD_DAYS.weekly));
  }, []);

  const onChangeTab = (tab: string, previousDays: number) => {
    dispatch(getUsersLeaderboard(previousDays));
    setCurrentTab(tab);
  };

  const [currentTab, setCurrentTab] = useState<string>(LEADERBOARD_TABS[0]);

  return (
    <LeaderboardContentContainer>
      <PageHeader
        pageTitle="Volunteer Leaderboard"
        pageSubtitle="Celebrate all the contributions of our Speak for the Trees volunteers!"
      />
      {userLeaderboardItems.kind === AsyncRequestKinds.Completed && (
        <LeaderboardContainer>
          <LeaderboardTabs
            items={userLeaderboardItems.result}
            tabNames={LEADERBOARD_TABS}
            currentTab={currentTab}
            itemsPerPage={4}
            onChangeTimeTab={onChangeTab}
          />
        </LeaderboardContainer>
      )}
    </LeaderboardContentContainer>
  );
};

const mapStateToProps = (state: C4CState): VolunteerLeaderboardProps => {
  return {
    userLeaderboardItems: state.userLeaderboardState.userLeaderboard,
  };
};

export default connect(mapStateToProps)(VolunteerLeaderboard);
