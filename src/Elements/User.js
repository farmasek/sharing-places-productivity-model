import React from 'react';
import styled from 'styled-components';
import {
  placeSizes,
  placeType,
  teamColors,
} from '../model-definition/definition-constants';

const StyledUser = styled.p``;
export const User = ({ user }) =>
  <StyledUser>
    {user.get('hasStaticPlace') && ` |S| `}
    {user.get('firstName')} {user.get('lastName')}{' '}
    {user.get('hoCount')>=0 ? `HO:${user.get('hoCount')}`:''}
  </StyledUser>;
