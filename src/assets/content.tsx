import i18n from '../i18n/i18n';

// Available Teams
export const TEAMS_TITLE = 'Available Teams';
export const TEAMS_HEADER = 'Take a peek at the teams accepting new members!';

// Home
export const HOME_TITLE = 'Welcome back, ';
export const HOME_HEADER = "Let's get back to those trees, why don't we?";

// Login
export const LOGIN_TITLE = 'Log In';
export const LOGIN_HEADER = 'Welcome back!';
export const LOGIN_BODY =
  "Thanks for volunteering with us! Your work is vital in supporting the health of Boston's urban forest. " +
  "Let's get back to those trees.";
export const LOGIN_ERROR = 'The email or password you entered was incorrect.';

// Signup
export const SIGNUP_TITLE = 'Sign Up';
export const SIGNUP_HEADER = 'Nice to meet you!';
export const SIGNUP_BODY =
  'Thanks for your interest in volunteering with us! Taking care of over 9,000 trees (and counting!) is much ' +
  "harder than it seems, but with our dedicated volunteers, we're able to make Boston a cleaner, safer, and " +
  'more equitable community one tree at a time. Welcome to the team!';

// Team Leaderboard
export const TEAM_LEADERBOARD_TITLE = 'Team Leaderboard';
export const TEAM_LEADERBOARD_HEADER =
  "Let's celebrate your team reaching for its goals!";

// Reservations
export const RESERVATION_TITLE = 'My Blocks';
export const RESERVATION_BODY =
  "Here are the blocks you can sign up to inventory and the ones you've reserved! Did you know that we take care " +
  "of over 500 blocks of trees? We couldn't do it without you! ";

// My Trees
export const MY_TREES_TITLE = 'My Trees';
export const MY_TREES_BODY =
  'Here are the trees you have adopted. From here you can select a tree to record stewardship activities or ' +
  'you can adopt even more!';

// This dictionary that stores names to be shortHand-ed.
// To add a new area, add the full name and then the shorthand name separated by a colon.
export const SHORT_HAND_NAMES: { [fullName: string]: string } = {
  'North End': 'NE',
  'West End': 'WE',
  'Leather District': 'LD',
  'Beacon Hill': 'BH',
  'Back Bay': 'BB',
  Downtown: 'DT',
  Chinatown: 'CT',
  'Bay Village': 'BV',
};

// Dictionary containing 3-letter month abbreviations and their unabbreviated names
export const UNABBREVIATED_MONTHS: { [abbreviatedMonth: string]: string } = {
  Jan: i18n.t('unabbreviated_months.jan', { ns: 'content' }),
  Feb: i18n.t('unabbreviated_months.feb', { ns: 'content' }),
  Mar: i18n.t('unabbreviated_months.mar', { ns: 'content' }),
  Apr: i18n.t('unabbreviated_months.apr', { ns: 'content' }),
  May: i18n.t('unabbreviated_months.may', { ns: 'content' }),
  Jun: i18n.t('unabbreviated_months.jun', { ns: 'content' }),
  Jul: i18n.t('unabbreviated_months.jul', { ns: 'content' }),
  Aug: i18n.t('unabbreviated_months.aug', { ns: 'content' }),
  Sep: i18n.t('unabbreviated_months.sep', { ns: 'content' }),
  Oct: i18n.t('unabbreviated_months.oct', { ns: 'content' }),
  Nov: i18n.t('unabbreviated_months.nov', { ns: 'content' }),
  Dec: i18n.t('unabbreviated_months.dec', { ns: 'content' }),
};

// Dictionary containing 3-letter month abbreviations and their numeric equivalent
export const NUMERIC_MONTHS: { [abbreviatedMonth: string]: number } = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

// Tree Stats
export const STATS_HEADER = 'Current Status of our Trees';
export const MONEY_STAT_TITLE = 'Money Saved';
export const RAIN_STAT_TITLE = 'Rain Water Caught';
export const EMISSIONS_STAT_TITLE = 'Carbon Emissions Captured';

// Other
export enum Neighborhoods {
  BACK_BAY = 'Back Bay',
  CHARLESTOWN = 'Charlestown',
  DORCHESTER = 'Dorchester',
  DOWNTOWN = 'Downtown',
  EAST_BOSTON = 'East Boston',
  HYDE_PARK = 'Hyde Park',
  JAMAICA_PLAIN = 'Jamaica Plain',
  MATTAPAN = 'Mattapan',
  MISSION_HILL = 'Mission Hill',
  NORTH_END = 'North End',
  ROSLINDALE = 'Roslindale',
  ROXBURY = 'Roxbury',
  SOUTH_BOSTON = 'South Boston',
  WEST_ROXBURY = 'West Roxbury',
  HARBOR_ISLANDS = 'Harbor Islands',
  ALLSTON = 'Allston',
  BRIGHTON = 'Brighton',
  CHINATOWN = 'Chinatown',
  LEATHER_DISTRICT = 'Leather District',
  LONGWOOD = 'Longwood',
  SOUTH_BOSTON_WATERFRONT = 'South Boston Waterfront',
  BEACON_HILL = 'Beacon Hill',
  WEST_END = 'West End',
  SOUTH_END = 'South End',
  BAY_VILLAGE = 'Bay Village',
  FENWAY = 'Fenway',
}

export const NEIGHBORHOOD_IDS: { [id: number]: string } = {
  2: Neighborhoods.BACK_BAY,
  4: Neighborhoods.CHARLESTOWN,
  6: Neighborhoods.DORCHESTER,
  7: Neighborhoods.DOWNTOWN,
  8: Neighborhoods.EAST_BOSTON,
  10: Neighborhoods.HYDE_PARK,
  11: Neighborhoods.JAMAICA_PLAIN,
  12: Neighborhoods.MATTAPAN,
  13: Neighborhoods.MISSION_HILL,
  14: Neighborhoods.NORTH_END,
  15: Neighborhoods.ROSLINDALE,
  16: Neighborhoods.ROXBURY,
  17: Neighborhoods.SOUTH_BOSTON,
  19: Neighborhoods.WEST_ROXBURY,
  22: Neighborhoods.HARBOR_ISLANDS,
  24: Neighborhoods.ALLSTON,
  25: Neighborhoods.BRIGHTON,
  26: Neighborhoods.CHINATOWN,
  27: Neighborhoods.LEATHER_DISTRICT,
  28: Neighborhoods.LONGWOOD,
  29: Neighborhoods.SOUTH_BOSTON_WATERFRONT,
  30: Neighborhoods.BEACON_HILL,
  31: Neighborhoods.WEST_END,
  32: Neighborhoods.SOUTH_END,
  33: Neighborhoods.BAY_VILLAGE,
  34: Neighborhoods.FENWAY,
};

export const NEIGHBORHOOD_OPTS = [
  { label: 'Back Bay', value: 2 },
  { label: 'Charlestown', value: 4 },
  { label: 'Dorchester', value: 6 },
  { label: 'Downtown', value: 7 },
  { label: 'East Boston', value: 8 },
  { label: 'Hyde Park', value: 10 },
  { label: 'Jamaica Plain', value: 11 },
  { label: 'Mattapan', value: 12 },
  { label: 'Mission Hill', value: 13 },
  { label: 'North End', value: 14 },
  { label: 'Roslindale', value: 15 },
  { label: 'Roxbury', value: 16 },
  { label: 'South Boston', value: 17 },
  { label: 'West Roxbury', value: 19 },
  { label: 'Harbor Islands', value: 22 },
  { label: 'Allston', value: 24 },
  { label: 'Brighton', value: 25 },
  { label: 'Chinatown', value: 26 },
  { label: 'Leather District', value: 27 },
  { label: 'Longwood', value: 28 },
  { label: 'South Boston Waterfront', value: 29 },
  { label: 'Beacon Hill', value: 30 },
  { label: 'West End', value: 31 },
  { label: 'South End', value: 32 },
  { label: 'Bay Village', value: 33 },
  { label: 'Fenway', value: 34 },
];
