import { placeType, teamDefinitions } from './definition-constants';

export const initialAssign = (users, places) => {
  let assignedPlaces = places;
  teamDefinitions.forEach(team => {
    users
      .filter(
        user =>
          team.teamName === user.get('teamName') &&
          user.get('hasStaticPlace') === true
      )
      .forEach(user => {
        let place = assignedPlaces.find(
          place =>
            place.get('type') === placeType.static &&
            place.get('team') === team.teamName &&
            !place.get('user')
        );
        assignedPlaces = assignedPlaces.setIn(
          [place.get('number'), 'user'],
          user
        );
        console.log('dude', assignedPlaces);
      });
  });
  return assignedPlaces
};

export const assignEmployeeToPlace = (employee, places, day) => {};
