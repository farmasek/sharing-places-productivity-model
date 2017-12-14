import { fromJS, OrderedMap } from 'immutable';
import { generateAllSeats, generateUsers } from './data-generators';
import { initialAssign } from './place-assigner';

export const initialState = teamDefinitions => {
  const users = generateUsers(teamDefinitions);
  const places = generateAllSeats(teamDefinitions);

  return fromJS({
    places: initialAssign(teamDefinitions,users, places),
    users,
    dayPlaces: OrderedMap(),
    selectedDay: -1,
  });
};
