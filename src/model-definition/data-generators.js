import { fromJS, OrderedMap } from 'immutable';
import { placeType, teamDefinitions } from './definition-constants';
import Faker from 'faker';
const generatePlaces = (startAt, totalCount, totalStatic, team) => {
  let developerData = new OrderedMap();
  let total = 0;

  for (let position = startAt; position < startAt + totalCount; position++) {
    developerData = developerData.set(
      position,
      fromJS({
        type: total < totalStatic ? placeType.static : placeType.shared,
        number: position,
        team,
      })
    );
    total++;
  }
  return developerData;
};

export const generateAllSeats = () => {
  let allSeats = new OrderedMap();
  teamDefinitions.forEach(team => {
    allSeats = allSeats.merge(
      generatePlaces(
        allSeats.size,
        team.totalCount,
        team.totalStatic,
        team.teamName
      )
    );
  });

  return allSeats;
};

export const generateUsers = () => {
    Faker.locale= 'cz'
  let allUsers = new OrderedMap();

  teamDefinitions.forEach(team => {
    for (let i = 0; i < team.totalEmployees; i++) {
      const id = Faker.random.uuid();
      allUsers = allUsers.set(
        id,
        fromJS({
          firstName: Faker.name.firstName(),
          lastName: Faker.name.lastName(),
          id,
          teamName: team.teamName,
          hasStaticPlace: i < team.totalStatic,
        })
      );
    }
  });
  return allUsers;
};
