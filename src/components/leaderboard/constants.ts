const LEADERBOARD_TABS = ['Weekly', 'Monthly', 'Yearly', 'All Time'];

const tabToDays = (leaderboardTab: string): number | null => {
  switch (leaderboardTab) {
    case 'Weekly':
      return 7;
    case 'Monthly':
      return 30;
    case 'Yearly':
      return 365;
    default:
      return null;
  }
};

export { LEADERBOARD_TABS, tabToDays };
