import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { LogicProvider } from './LogicProvider';
import { PlaceField } from './Elements/PlaceField';
import styled from 'styled-components';
import { TeamDetail } from './Elements/TeamDetail';
import {
  teamDefinitions,
  teamName,
  totalDays,
} from './model-definition/definition-constants';
const StyledBody = styled.div`
  display: inline-flex;
  width: 100%;
`;
const StyledLegend = styled.div`
  width: 400px;
  background-color: #e7e7e7;
`;
const StyledSimulationBody = styled.div`min-width: 1000px`;

class App extends Component {
  state = { tab: 0 };
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
          render={({ state, simulateReservationsForNextDay, selectDay }) =>
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
                <div>
                  <button onClick={() => this.setState({ tab: 0 })}>
                    Places occupied
                  </button>
                  <button onClick={() => this.setState({ tab: 1 })}>
                    People without place
                  </button>
                </div>
                {this.state.tab === 0 &&
                  <PlaceField
                    places={
                      state.get('selectedDay') === -1
                        ? state.get('places')
                        : state.getIn(['dayPlaces', state.get('selectedDay')])
                    }
                  />}
                {this.state.tab === 1 &&
                  <div>
                    {state.get('selectedDay') > -1 &&
                      teamDefinitions
                        .filter(team => team.teamName !== teamName.free)
                        .map(team =>
                          <TeamDetail
                            showDetails={false}
                            team={team}
                            users={state
                              .getIn(['dayUsers', state.get('selectedDay')])
                              .filter(
                                user => user.get('teamName') === team.teamName
                              )
                              .filter(user => !user.get('hasStaticPlace'))
                              .filter(user => user.get('hoCount') < 0)}
                          />
                        )}
                  </div>}
              </StyledSimulationBody>
              <StyledLegend>
                <button onClick={simulateReservationsForNextDay}>
                  Simulate reservations
                </button>
                <br />
                <h4>Select day</h4>
                <button onClick={selectDay(-1)}>Default day</button>
                <br />
                {state.get('dayPlaces').toIndexedSeq().map((val, num) =>
                  <button key={num} onClick={selectDay(num)}>
                    {num + 1}
                  </button>
                )}
                <p>HO left</p>
                {state.get('selectedDay') > -1 &&
                  teamDefinitions
                    .filter(team => team.teamName !== teamName.free)
                    .map(team =>
                      <TeamDetail
                        showDetails={false}
                        team={team}
                        users={state
                          .getIn(['dayUsers', state.get('selectedDay')])
                          .filter(
                            user => user.get('teamName') === team.teamName
                          )
                          .filter(user => user.get('hoCount') > 0)}
                      />
                    )}
              </StyledLegend>
            </StyledBody>}
        />
      </div>
    );
  }
}

export default App;
