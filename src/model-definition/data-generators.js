import { fromJS, OrderedMap } from 'immutable';
import { placeType, } from './definition-constants';
import Faker from 'faker';
const generatePlaces = (startAt, totalCount, totalStatic, team, teamColor) => {
  let developerData = new OrderedMap();
  let total = 0;

  for (let position = startAt; position < startAt + totalCount; position++) {
    developerData = developerData.set(
      position,
      fromJS({
        type: total < totalStatic ? placeType.static : placeType.shared,
        number: position,
        team,
        teamColor,
      }),
    );
    total++;
  }
  return developerData;
};

export const generateAllSeats = (teamDefinitions) => {
  let allSeats = new OrderedMap();
  teamDefinitions.forEach(team => {
    allSeats = allSeats.merge(
      generatePlaces(
        allSeats.size,
        team.totalWorkspaces,
        team.totalStatic,
        team.teamName,
        team.teamColor,
      ),
    );
  });

  return allSeats;
};

const resolveHoCount = (team, index) => {
  let i = index;
  if (i < team.oneHO) {
    return 1;
  }
  i = i - team.oneHO;
  if (i < team.twoHO) {
    return 2;
  }
  i = i - team.twoHO;
  if (i < team.threeHO) {
    return 3;
  }
  i = i - team.threeHO;
  if (i < team.fourHO) {
    return 4;
  }
  i = i - team.fourHO;
  if (i < team.fiveHO) {
    return 5;
  }
  return 0;
};

export const generateUsers = (teamDefinitions) => {
  Faker.locale = 'cz';
  let allUsers = new OrderedMap();

  teamDefinitions.forEach(team => {
    let teamUsers = new OrderedMap();

    for (let i = 0; i < team.totalEmployees; i++) {
      const id = Faker.random.uuid();
      teamUsers = teamUsers.set(
        id,
        fromJS({
          firstName: Faker.name.firstName(),
          lastName: Faker.name.lastName(),
          id,
          teamName: team.teamName,
          hasStaticPlace: i < team.totalStatic,
          hoCount:
            i < team.totalStatic
              ? -1
              : resolveHoCount(
                  team,
                  teamUsers.filter(user => !user.get('hasStaticPlace')).size,
                ),
        }),
      );
    }
    allUsers = allUsers.merge(
      teamUsers.sort((u1, u2) => u1.get('hoCount') - u2.get('hoCount')),
    );
  });
  return allUsers;
};
