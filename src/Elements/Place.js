import React from 'react';
import styled from 'styled-components';
import {
  placeSizes,
  placeType,
  teamColors,
} from '../model-definition/definition-constants';
const calculateX = x => x * placeSizes.width + x * placeSizes.spaceRigh;
const calculateY = y => y * placeSizes.height + y * placeSizes.spaceTop;

const StyledPlace = styled.div`
  position: absolute;
  background-color: ${({ place }) => teamColors[place.get('team')]};
  width: ${placeSizes.width}px;
  height: ${placeSizes.height}px;
  top: ${({ place }) => calculateY(place.get('y'))}px;
  left: ${({ place }) => calculateX(place.get('x'))}px;
  ${({ place }) =>
    place.get('type') === placeType.shared && ' box-shadow: inset 0 0 0px 2px green;'};
`;
export const Place = ({ place }) => (
  <StyledPlace key={`${place.get('x')}_${place.get('y')}`} place={place}>
    {place.get('number')}
  </StyledPlace>
);
