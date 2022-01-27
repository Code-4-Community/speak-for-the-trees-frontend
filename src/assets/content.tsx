// Available Teams
export const TEAMS_TITLE = 'Available Teams';
export const TEAMS_HEADER = 'Take a peek at the teams accepting new members!';

// Home
export const HOME_TITLE = 'Welcome back, ';
export const HOME_HEADER = "Let's get back to those trees, why don't we?";

// Landing
export const LANDING_TITLE = "Boston's Street Trees";
export const LANDING_BODY =
  "Boston's trees do a lot for our community - they clean our polluted air, offer shade on scorching summer days, " +
  'block wind on freezing winter nights, and prevent flooding during storms. At Speak for the Trees, ' +
  "we're determined to improve the size and health of our urban forest, especially in under-served and " +
  "under-canopied communities. And now you can help grow Boston's urban forest by adopting and caring for a tree!";

// Adoption Directions
export const ADOPTION_DIRECTIONS_HEADER = 'How to Adopt a Tree';
export const FIND_DIRECTION =
  'Find a tree near you by entering your address in the search bar at the at the top left of the map.';
export const ICONS_DIRECTION =
  'Click on the dot of a tree you might be interested in adopting.';
export const REDIRECTED_DIRECTION =
  'Once you\'ve found a tree to adopt, click on "More Info" to go to that tree\'s page, where you can adopt it!';

// Map Legend
export const ADOPTED_TREE_ICON_DESCRIPTION =
  'These trees have already been adopted';
export const TREE_ICON_DESCRIPTION =
  "Older trees who don't need as much help but would still love to be adopted";
export const YOUNG_TREE_ICON_DESCRIPTION =
  'Newly planted trees who need the most care';
export const OPEN_SITE_DESCRIPTION =
  'Empty sites where future trees could be planted';
export const OPEN_BLOCK_DESCRIPTION = 'Open blocks ready to be reserved';
export const RESERVED_BLOCK_DESCRIPTION = "Blocks you've already reserved";
export const CLOSED_BLOCK_DESCRIPTION =
  'Blocks someone else has already reserved';
export const PRIVATE_STREET_DESCRIPTION =
  "Private streets that volunteers shouldn't enter!";

// Login
export const LOGIN_TITLE = 'Log In';
export const LOGIN_HEADER = 'Welcome back!';
export const LOGIN_BODY =
  "Thanks for volunteering with us! Your work is vital in supporting the health of Boston's urban forest. " +
  "Let's get back to those trees.";
export const LOGIN_ERROR = 'The username or email you entered was incorrect.';

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

// Tree Stats
export const STATS_HEADER = 'Current Status of our Trees';
export const MONEY_STAT_TITLE = 'Money Saved';
export const RAIN_STAT_TITLE = 'Rain Water Caught';
export const EMISSIONS_STAT_TITLE = 'Carbon Emissions Captured';

// Other
export const CITY_PLANTING_REQUEST_LINK =
  'https://www.cityofboston.gov/mayor/24?topic=new-tree-request';

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
