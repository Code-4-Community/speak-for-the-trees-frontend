import React, { useEffect, useState } from 'react';
import LeaderboardTabs, {
  TabInfo,
} from '../../components/leaderboard/leaderboard-tabs/LeaderboardTabs';
import { C4CState } from '../../store';
import PageHeader from '../../components/pageheader/PageHeader';
import styled from 'styled-components';
import { TeamLeaderboardReducerState } from './ducks/types';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getTeamsLeaderboard } from './ducks/thunks';
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

interface TeamLeaderboardProps {
  readonly teamLeaderboardItems: TeamLeaderboardReducerState['teamLeaderboard'];
}

const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({
  teamLeaderboardItems,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeamsLeaderboard(LEADERBOARD_DAYS.weekly));
  }, []);

  const onChangeTab = (tab: string, previousDays: number) => {
    dispatch(getTeamsLeaderboard(previousDays));
    setCurrentTab(tab);
  };

  const [currentTab, setCurrentTab] = useState<string>(LEADERBOARD_TABS[0]);

  return (
    <LeaderboardContentContainer>
      <PageHeader
        pageTitle="Team Leaderboard"
        pageSubtitle="Let’s celebrate your team reaching for its goals!"
      />

      <LeaderboardContainer>
        {teamLeaderboardItems.kind === AsyncRequestKinds.Completed && (
          <LeaderboardTabs
            items={teamLeaderboardItems.result}
            tabNames={LEADERBOARD_TABS}
            currentTab={currentTab}
            itemsPerPage={4}
            onChangeTimeTab={onChangeTab}
          />
        )}
      </LeaderboardContainer>
    </LeaderboardContentContainer>
  );
};

const mapStateToProps = (state: C4CState): TeamLeaderboardProps => {
  return {
    teamLeaderboardItems: state.teamLeaderboardState.teamLeaderboard,
  };
};

export default connect(mapStateToProps)(TeamLeaderboard);
