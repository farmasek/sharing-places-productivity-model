import React from 'react';
import styled from 'styled-components';

const StyledTeam = styled.div`
  border: 2px solid ${props => props.color};
  border-radius: 10px;
  margin: 1em;
`;

const StyledMembers = styled.div`
  text-align: left;
  padding: 1em;
`;

export const TeamDetail = ({ team, users }) =>
  <StyledTeam color={team.teamColor}>
    <h5>
      {team.teamName}
    </h5>
    <u>Places</u>
    <p>
      Total:{team.totalCount}
      {` `}
      Static:{team.totalStatic}
    </p>
    <u>
      Employees({team.totalEmployees})
    </u>
    <StyledMembers>
      {users.toIndexedSeq().map(user =>
        <p key={user.get('id')}>
          {user.get('hasStaticPlace') && ` |S| `}
          {user.get('firstName')} {user.get('lastName')}
        </p>
      )}
    </StyledMembers>
  </StyledTeam>;
