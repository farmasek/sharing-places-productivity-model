import { placeType, teamName } from './definition-constants';

export const initialAssign = (teamDefinitions, users, places) => {
  let assignedPlaces = places;
  teamDefinitions.forEach(team => {
    users
      .filter(team => team.teamName !== teamName.free)
      .filter(
        user =>
          team.teamName === user.get('teamName') &&
          user.get('hasStaticPlace') === true,
      )
      .forEach(user => {
        let place = assignedPlaces.find(
          place =>
            place.get('type') === placeType.static &&
            place.get('team') === team.teamName &&
            !place.get('user'),
        );
        assignedPlaces = assignedPlaces.setIn(
          [place.get('number'), 'user'],
          user,
        );
      });
  });
  return assignedPlaces;
};

export const assignEmployeesToPlace = (
  teamDefinitions,
  users,
  places,
  actualDay,
) => {
  let nextUsers = users;
  let assignedPlaces = places;
  teamDefinitions
    .filter(team => team.teamName !== teamName.free)
    .forEach(team => {
      nextUsers
        .filter(
          user =>
            team.teamName === user.get('teamName') &&
            !user.get('hasStaticPlace'),
        )
        .forEach(user => {
          let userNextHOCount = user.get('hoCount') - 1;
          if (5 - user.get('hoCount') > actualDay) {
            let place = assignedPlaces.find(
              place =>
                place.get('type') === placeType.shared &&
                place.get('team') === team.teamName &&
                !place.get('user'),
            );
            if (place) {
              assignedPlaces = assignedPlaces.setIn(
                [place.get('number'), 'user'],
                user,
              );
            } else {
              let freePlace = assignedPlaces.find(
                place =>
                  place.get('type') === placeType.shared &&
                  place.get('team') === teamName.free &&
                  !place.get('user'),
              );
              if (freePlace) {
                assignedPlaces = assignedPlaces.setIn(
                  [freePlace.get('number'), 'user'],
                  user,
                );
              } else {
                nextUsers = nextUsers.set(
                  user.get('id'),
                  user.set('hoCount', userNextHOCount),
                );
              }
            }
          } else {
            nextUsers = nextUsers.set(
              user.get('id'),
              user.set('hoCount', userNextHOCount),
            );
          }
        });
    });
  return { dayPlaces: assignedPlaces, dayUsers: nextUsers };
};
