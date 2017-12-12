import { fromJS, OrderedMap } from 'immutable';
import { generateAllSeats, generateUsers } from './data-generators';
import { initialAssign } from './place-assigner';

const users = generateUsers();
const places = generateAllSeats();

export const initialState = fromJS({
  places: initialAssign(users, places),
  users,
  dayPlaces: OrderedMap(),
  selectedDay: -1,
});
