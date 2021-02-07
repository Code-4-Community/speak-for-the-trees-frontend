const LEADERBOARD_TABS = [
  'Weekly', 'Monthly', 'Yearly', 'All Time'
];

enum LEADERBOARD_DAYS {
  weekly = 7,
  monthly = 30,
  yearly = 365,
  allTime = 9999,
}

const tabToDays = (leaderboardTab: string): LEADERBOARD_DAYS => {
  switch(leaderboardTab) {
    case 'Weekly':
      return LEADERBOARD_DAYS.weekly;
    case 'Monthly':
      return LEADERBOARD_DAYS.monthly;
    case 'Yearly':
      return LEADERBOARD_DAYS.yearly;
    default:
      return LEADERBOARD_DAYS.allTime;    
  }
}

export {
  LEADERBOARD_TABS,
  LEADERBOARD_DAYS,
  tabToDays
}