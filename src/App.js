import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LogicProvider } from './LogicProvider';
import { PlaceField } from './Elements/PlaceField';
import styled from 'styled-components';
import { TeamDetail } from './Elements/TeamDetail';
import { teamDefinitions } from './model-definition/definition-constants';
const StyledBody = styled.div`
  display: inline-flex;
  width: 100%;
`;
const StyledLegend = styled.div`
  width: 400px;
  background-color: #e7e7e7;
`;
const StyledSimulationBody = styled.div`width: auto;`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome Mosim Simulation project</h1>
          <h6>
            Openspace has only limited amount of places to work. There is
            possibility to have Home-office, have static place or sit on shared
            place.
          </h6>
        </header>
        <LogicProvider
          render={({ state }) =>
            <StyledBody>
              <StyledLegend>
                <h3>Legend:</h3>
                {teamDefinitions.map(team =>
                  <TeamDetail
                    team={team}
                    users={state
                      .get('users')
                      .filter(user => user.get('teamName') === team.teamName)}
                  />
                )}
              </StyledLegend>
              <StyledSimulationBody>
                <PlaceField places={state.get('places')} />
              </StyledSimulationBody>
            </StyledBody>}
        />
      </div>
    );
  }
}

export default App;
