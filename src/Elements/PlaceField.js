import { Place } from './Place';
import React, { Component } from 'react';

import styled from 'styled-components';

const StyledPlaceField = styled.div`
  position: relative;
  width: 1000px;
  height: 1000px;
  background-color: aqua;
`;

export class PlaceField extends Component {
  render() {
    return (
      <StyledPlaceField>
        {this.props.places
          .map(place =>
            place
              .set('x', place.get('number') % 10)
              .set('y', Math.floor(place.get('number') / 10)),
          )
          .toIndexedSeq()
          .map(place => (
            <Place key={`${place.get('x')}_${place.get('y')}`} place={place} />
          ))}
      </StyledPlaceField>
    );
  }
}
