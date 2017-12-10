import { fromJS, List } from 'immutable';
import { generateAllSeats } from './data-generators';

export const initialState = fromJS({
  places: generateAllSeats(),
});
