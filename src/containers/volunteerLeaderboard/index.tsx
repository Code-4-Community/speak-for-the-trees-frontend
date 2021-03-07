import React, { useState, useEffect } from 'react';
import LeaderboardTabs from '../../components/leaderboard/leaderboardTabs';
import { TabItem } from '../../components/leaderboard/types';
import { C4CState } from '../../store';
import PageHeader from '../../components/pageHeader';
import styled from 'styled-components';
import { mapVolunteersToTabItems } from './ducks/selectors';
import { connect, useDispatch } from 'react-redux';
import { AsyncRequestKinds } from '../../utils/asyncRequest';
import { getUsersLeaderboard } from './ducks/thunks';
import { LEADERBOARD_TABS } from '../../components/leaderboard/constants';

const LeaderboardContentContainer = styled.div`
  padding: 100px 134px;
`;

const LeaderboardContainer = styled.div`
  margin: 80px 0px 40px;
`;

interface VolunteerLeaderboardProps {
  readonly volunteerTabItems: TabItem[];
  readonly leaderboardRequestKind: AsyncRequestKinds;
}

const VolunteerLeaderboard: React.FC<VolunteerLeaderboardProps> = ({
  volunteerTabItems,
  leaderboardRequestKind,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // The default tab is weekly
    dispatch(getUsersLeaderboard(7));
  }, [dispatch]);

  const onChangeTab = (tab: string, previousDays: number | null) => {
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
      {leaderboardRequestKind === AsyncRequestKinds.Completed && (
        <LeaderboardContainer>
          <LeaderboardTabs
            items={volunteerTabItems}
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
    volunteerTabItems: mapVolunteersToTabItems(
      state.userLeaderboardState.userLeaderboard,
    ),
    leaderboardRequestKind: state.userLeaderboardState.userLeaderboard.kind,
  };
};

export default connect(mapStateToProps)(VolunteerLeaderboard);
