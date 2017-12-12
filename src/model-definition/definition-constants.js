export const placeType = {
  static: 'static',
  shared: 'shared',
};
export const placeSizes = {
  width: 80,
  height: 50,
  spaceTop: 5,
  spaceRigh: 5,
};

export const teamName = {
  developers: 'developers',
  testers: 'testers',
  support: 'support',
  free: 'free',
};
export const teamColors = {
  developers: '#5c8bff',
  testers: '#bbff59',
  support: '#ffb87f',
  free: '#2dff00',
};
export const totalDays = 5;

export const teamDefinitions = [
  {
    teamName: teamName.developers,
    teamColor: teamColors.developers,
    totalEmployees: 80,
    totalCount: 50,
    totalStatic: 25,
    oneHO: 5,
    twoHO: 2,
    threeHO: 3,
    fourHO: 2,
    fiveHO: 4,
  },
  {
    teamName: teamName.testers,
    teamColor: teamColors.testers,
    totalEmployees: 15,
    totalCount: 18,
    totalStatic: 13,
    oneHO: 2,
    twoHO: 0,
    threeHO: 0,
    fourHO: 0,
    fiveHO: 0,
  },
  {
    teamName: teamName.support,
    teamColor: teamColors.support,
    totalEmployees: 30,
    totalCount: 14,
    totalStatic: 5,
    oneHO: 5,
    twoHO: 2,
    threeHO: 3,
    fourHO: 1,
    fiveHO: 4,
  },
  {
    teamName: teamName.free,
    teamColor: teamColors.free,
    totalEmployees: 0,
    totalCount: 14,
    totalStatic: 0,
  },
];
