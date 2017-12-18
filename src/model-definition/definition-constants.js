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
  free: 'free',
};

export const teamDefinitions = [
  {
    teamName: 'developers', //unique team name
    teamColor: '#5c8bff', // color for workspace simulation
    totalEmployees: 80, // total employees of the team
    totalWorkspaces: 50, // total workspaces reserved for the team
    totalStatic: 25, // number of workspaces with only one assigned person
    oneHO: 5, // number of people allowed one work from home
    twoHO: 2, // number of people allowed two work from home
    threeHO: 3, // number of people allowed three work from home
    fourHO: 2, // number of people allowed four work from home
    fiveHO: 4, // number of people allowed five work from home
  },
  {
    teamName: 'testers',
    teamColor: '#bbff59',
    totalEmployees: 15,
    totalWorkspaces: 18,
    totalStatic: 13,
    oneHO: 2,
    twoHO: 0,
    threeHO: 0,
    fourHO: 0,
    fiveHO: 0,
  },
  {
    teamName: 'support',
    teamColor: '#ffb87f',
    totalEmployees: 30,
    totalWorkspaces: 14,
    totalStatic: 5,
    oneHO: 5,
    twoHO: 2,
    threeHO: 3,
    fourHO: 1,
    fiveHO: 4,
  },
  {
    teamName: 'free', //keyword for free seats
    teamColor: '#2dff00',
    totalEmployees: 0,
    totalWorkspaces: 14,
    totalStatic: 0,
  },
];
export const allWorkingDataset = [
  {
    teamName: 'developers',
    teamColor: '#5c8bff',
    totalEmployees: 20,
    totalWorkspaces: 20,
    totalStatic: 20,
    oneHO: 0,
    twoHO: 0,
    threeHO: 0,
    fourHO: 0,
    fiveHO: 0,
  },
  {
    teamName: 'testers',
    teamColor: '#ff9c32',
    totalEmployees: 5,
    totalWorkspaces: 5,
    totalStatic: 5,
    oneHO: 0,
    twoHO: 0,
    threeHO: 0,
    fourHO: 0,
    fiveHO: 0,
  },
  {
    teamName: 'free', //keyword for free seats
    teamColor: '#2dff00',
    totalEmployees: 0,
    totalWorkspaces: 0,
    totalStatic: 0,
  },
];

export const reducedByHalf = [
  {
    teamName: 'developers',
    teamColor: '#5c8bff',
    totalEmployees: 20,
    totalWorkspaces: 10,
    totalStatic: 0,
    oneHO: 0,
    twoHO: 10,
    threeHO: 10,
    fourHO: 0,
    fiveHO: 0,
  },
  {
    teamName: 'testers',
    teamColor: '#ff9c32',
    totalEmployees: 5,
    totalWorkspaces: 3,
    totalStatic: 0,
    oneHO: 0,
    twoHO: 3,
    threeHO: 3,
    fourHO: 0,
    fiveHO: 0,
  },
  {
    teamName: 'free',
    teamColor: '#2dff00',
    totalEmployees: 0,
    totalWorkspaces: 0,
    totalStatic: 0,
  },
];

export const fullHo = [
  {
    teamName: 'developers',
    teamColor: '#5c8bff',
    totalEmployees: 20,
    totalWorkspaces: 10,
    totalStatic: 0,
    oneHO: 0,
    twoHO: 0,
    threeHO: 0,
    fourHO: 0,
    fiveHO: 20,
  },
  {
    teamName: 'testers',
    teamColor: '#ff9c32',
    totalEmployees: 5,
    totalWorkspaces: 1,
    totalStatic: 0,
    oneHO: 0,
    twoHO: 0,
    threeHO: 0,
    fourHO: 0,
    fiveHO: 5,
  },
  {
    teamName: 'free',
    teamColor: '#2dff00',
    totalEmployees: 0,
    totalWorkspaces: 0,
    totalStatic: 0,
  },
];
