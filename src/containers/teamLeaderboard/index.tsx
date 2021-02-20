import React, { useState, useEffect } from 'react';
import LeaderboardTabs from '../../components/leaderboard/leaderboardTabs';
import { TabItem } from '../../components/leaderboard/leaderboardTab';
import { C4CState } from '../../store';
import PageHeader from '../../components/pageHeader';
import styled from 'styled-components';
import { mapTeamsToTabItems } from './ducks/selectors';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getTeamsLeaderboard } from './ducks/thunks';
import { LEADERBOARD_TABS } from '../../components/leaderboard/constants';

const LeaderboardContentContainer = styled.div`
  padding: 100px 134px;
`;

const LeaderboardContainer = styled.div`
  margin: 80px 0px 40px;
`;

interface TeamLeaderboardProps {
  readonly teamTabItems: TabItem[];
  readonly leaderboardRequestKind: AsyncRequestKinds;
}

const TeamLeaderboard: React.FC<TeamLeaderboardProps> = ({
  teamTabItems,
  leaderboardRequestKind,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // The default tab is Weekly
    dispatch(getTeamsLeaderboard(7));
  }, [dispatch]);

  const onChangeTab = (tab: string, previousDays: number | null) => {
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
        {leaderboardRequestKind === AsyncRequestKinds.Completed && (
          <LeaderboardTabs
            items={teamTabItems}
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
    teamTabItems: mapTeamsToTabItems(
      state.teamLeaderboardState.teamLeaderboard,
    ),
    leaderboardRequestKind: state.teamLeaderboardState.teamLeaderboard.kind,
  };
};

export default connect(mapStateToProps)(TeamLeaderboard);
