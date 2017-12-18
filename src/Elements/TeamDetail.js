import React from 'react';
import styled from 'styled-components';
import { User } from './User';

const StyledTeam = styled.div`
  border: 2px solid ${props => props.color};
  border-radius: 10px;
  margin: 1em;
`;

const StyledMembers = styled.div`
  text-align: left;
  padding: 1em;
`;

export const TeamDetail = ({ team, users, showDetails = true }) => (
  <StyledTeam color={team.teamColor}>
    <h5>{team.teamName}</h5>
    {showDetails && (
      <React.Fragment>
        <u>Places</u>
        <p>
          Total:{team.totalWorkspaces}
          {` `}
          Static:{team.totalStatic}
        </p>
        <u>Employees({team.totalEmployees})</u>
      </React.Fragment>
    )}
    <StyledMembers>
      {users
        .toIndexedSeq()
        .map(user => (
          <User
            key={`${user.get('firstName')} ${user.get('lastName')}`}
            user={user}
          />
        ))}
    </StyledMembers>
  </StyledTeam>
);
