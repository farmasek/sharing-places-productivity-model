import { fromJS, OrderedMap } from 'immutable';
import { placeType, teamName } from './definition-constants';

export const developersConstants = {
  totalCount: 50,
  totalStatic: 25,
};
export const testersConstants = {
  totalCount: 20,
  totalStatic: 12,
};
export const supportConstants = {
  totalCount: 39,
  totalStatic: 10,
};

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
      }),
    );
    total++;
  }
  return developerData;
};

export const generateAllSeats = () => {
  let allSeats = new OrderedMap();
  allSeats = allSeats.merge(
    generatePlaces(
      allSeats.size,
      developersConstants.totalCount,
      developersConstants.totalStatic,
      teamName.developers,
    ),
  );
  allSeats = allSeats.merge(
    generatePlaces(
      allSeats.size,
      supportConstants.totalCount,
      supportConstants.totalStatic,
      teamName.support,
    ),
  );
  allSeats = allSeats.merge(
    generatePlaces(
      allSeats.size,
      testersConstants.totalCount,
      testersConstants.totalStatic,
      teamName.testers,
    ),
  );
  return allSeats;
};
