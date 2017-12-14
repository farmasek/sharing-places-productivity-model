import React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${props => (props.active ? 'red' : '#4d86ff')};
  border: none;
  color: white;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  &:hover {
    background-color: #868686;
  }
`;