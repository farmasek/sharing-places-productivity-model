Simple project for PRF OSU KIP/MOSIM

Project should model and simulate workspaces in office where are more people than spaces.
Some people can work from home, but only for limited amount of days.

Model helps to define what is optimal number of home offices, in office time and static office.

Model handles multiple teams.

Dataset is defined as array of teams, where on team definition is:

```
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
```