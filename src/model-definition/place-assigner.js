import { placeType, teamDefinitions, teamName } from './definition-constants';

export const initialAssign = (users, places) => {
  let assignedPlaces = places;
  teamDefinitions.forEach(team => {
    users
      .filter(team => team.teamName !== teamName.free)
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
      });
  });
  return assignedPlaces;
};

export const assignEmployeesToPlace = (users, places) => {
  let nextUsers = users;
  let assignedPlaces = places;
  teamDefinitions
    .filter(team => team.teamName !== teamName.free)
    .forEach(team => {
      nextUsers
        .filter(
          user =>
            team.teamName === user.get('teamName') &&
            !user.get('hasStaticPlace')
        )
        .forEach(user => {
          let userNextHOCount = user.get('hoCount') - 1;
          if (userNextHOCount <= 0) {
            let place = assignedPlaces.find(
              place =>
                place.get('type') === placeType.shared &&
                place.get('team') === team.teamName &&
                !place.get('user')
            );
            if (place) {
              assignedPlaces = assignedPlaces.setIn(
                [place.get('number'), 'user'],
                user.set('hoCount', 0)
              );
              nextUsers = nextUsers.set(user.get('id'), user.set('hoCount', 0));
            } else {
              let freePlace = assignedPlaces.find(
                place =>
                  place.get('type') === placeType.shared &&
                  place.get('team') === teamName.free &&
                  !place.get('user')
              );
              if (freePlace) {
                assignedPlaces = assignedPlaces.setIn(
                  [freePlace.get('number'), 'user'],
                  user.set('hoCount', 0)
                );
                nextUsers = nextUsers.set(
                  user.get('id'),
                  user.set('hoCount', 0)
                );
              } else {
                nextUsers = nextUsers.set(
                  user.get('id'),
                  user.set('hoCount', userNextHOCount)
                );
              }
            }
          } else {
            console.log('berore', user.toJS().hoCount);
            console.log(
              'fml',
              user.set('hoCount', userNextHOCount).toJS().hoCount
            );
            nextUsers = nextUsers.set(
              user.get('id'),
              user.set('hoCount', userNextHOCount)
            );
          }
        });
    });
  return { dayPlaces: assignedPlaces, dayUsers: nextUsers };
};
