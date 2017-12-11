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
};
export const teamColors = {
  developers: '#5c8bff',
  testers: '#bbff59',
  support: '#ffb87f',
};

export const teamDefinitions = [
  {
    teamName: teamName.developers,
    teamColor: teamColors.developers,
    totalEmployees: 80,
    totalCount: 50,
    totalStatic: 25,
  },
  {
    teamName: teamName.testers,
    teamColor: teamColors.testers,
    totalEmployees: 15,

    totalCount: 18,
    totalStatic: 13,
  },
  {
    teamName: teamName.support,
    teamColor: teamColors.support,
    totalEmployees: 30,

    totalCount: 14,
    totalStatic: 5,
  },
];
