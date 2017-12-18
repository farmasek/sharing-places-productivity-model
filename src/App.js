import React, { Component } from 'react';
import './App.css';
import { LogicProvider } from './LogicProvider';
import { PlaceField } from './Elements/PlaceField';
import styled from 'styled-components';
import { TeamDetail } from './Elements/TeamDetail';
import {
  allWorkingDataset,
  fullHo,
  reducedByHalf,
  teamName,
} from './model-definition/definition-constants';
import { Button } from './Elements/Button';
const StyledBody = styled.div`
  display: inline-flex;
  width: 100%;
`;
const StyledLegend = styled.div`
  width: 400px;
  background-color: #e7e7e7;
`;
const StyledTextArea = styled.textarea`
  height: 150px;
  width: 400px;
`;
const StyledSimulationBody = styled.div`min-width: 1000px;`;
const StyledHeaderCol = styled.div`margin: 1em;`;

class App extends Component {
  state = { tab: 0 };
  tryParseDataset = (dataset, applyDataset) => () => {
    try {
      applyDataset(JSON.parse(dataset));
    } catch (e) {
      applyDataset([]);
    }
  };
  render() {
    return (
      <LogicProvider
        render={({
          state,
          simulateReservationsForNextDay,
          selectDay,
          applyDataset,
          activeTeamDefinition,
          editTeamDefinition,
          editingTeamDefinition,
          simulateReservationsForWeek,
        }) => (
          <div className="App">
            <StyledBody className="App-header">
              <StyledHeaderCol>
                <h3>MOSIM model project</h3>
                <p>
                  This model models and simulates usage of working place in
                  office
                </p>
              </StyledHeaderCol>
              <StyledTextArea
                value={editingTeamDefinition}
                onChange={editTeamDefinition}
              />
              <StyledHeaderCol>
                <h5>model verification datasets (usually after 5 days)</h5>
                <Button onClick={() => applyDataset(allWorkingDataset)}>
                  Everybody should be at work every day
                </Button>
                <Button onClick={() => applyDataset(reducedByHalf)}>
                  10*2HO and 10*3HO should reduce workspaces by half
                </Button>
                <Button onClick={() => applyDataset(fullHo)}>
                  Everybody can 5 HO, nobody should be at workspace
                </Button>
              </StyledHeaderCol>
            </StyledBody>
            <StyledBody>
              <StyledLegend>
                <h3>Legend:</h3>
                {activeTeamDefinition.map(team => (
                  <TeamDetail
                    key={team.teamName}
                    team={team}
                    users={state
                      .get('users')
                      .filter(user => user.get('teamName') === team.teamName)}
                  />
                ))}
              </StyledLegend>
              <StyledSimulationBody>
                <div>
                  <Button
                    onClick={this.tryParseDataset(
                      editingTeamDefinition,
                      applyDataset,
                    )}
                  >
                    Apply new dataset
                  </Button>
                  <Button
                    active={this.state.tab === 0}
                    onClick={() => this.setState({ tab: 0 })}
                  >
                    Places occupied
                  </Button>
                  <Button
                    active={this.state.tab === 1}
                    onClick={() => this.setState({ tab: 1 })}
                  >
                    People without place
                  </Button>
                </div>
                {this.state.tab === 0 && (
                  <PlaceField
                    places={
                      state.get('selectedDay') === -1 ? (
                        state.get('places')
                      ) : (
                        state.getIn(['dayPlaces', state.get('selectedDay')])
                      )
                    }
                  />
                )}
                {this.state.tab === 1 && (
                  <div>
                    {state.get('selectedDay') > -1 ? (
                      activeTeamDefinition
                        .filter(team => team.teamName !== teamName.free)
                        .map(team => (
                          <TeamDetail
                            key={team.teamName}
                            showDetails={false}
                            team={team}
                            users={state
                              .getIn(['dayUsers', state.get('selectedDay')])
                              .filter(
                                user => user.get('teamName') === team.teamName,
                              )
                              .filter(user => !user.get('hasStaticPlace'))
                              .filter(user => user.get('hoCount') < 0)
                              .filter(
                                user =>
                                  !state
                                    .getIn([
                                      'dayPlaces',
                                      state.get('selectedDay'),
                                    ])
                                    .find(
                                      place =>
                                        place.getIn(['user', 'id']) ===
                                        user.get('id'),
                                    ),
                              )}
                          />
                        ))
                    ) : (
                      <p>No day selected.</p>
                    )}
                  </div>
                )}
              </StyledSimulationBody>
              <StyledLegend>
                <Button onClick={simulateReservationsForWeek}>
                  Simulate reservations
                </Button>
                <br />
                <h4>Select day</h4>
                <Button onClick={selectDay(-1)}>Default day</Button>
                <br />
                {state
                  .get('dayPlaces')
                  .toIndexedSeq()
                  .map((val, num) => (
                    <Button
                      active={state.get('selectedDay') === num}
                      key={num}
                      onClick={selectDay(num)}
                    >
                      {num + 1}
                    </Button>
                  ))}
                <p>HO left</p>
                {state.get('selectedDay') > -1 &&
                  activeTeamDefinition
                    .filter(team => team.teamName !== teamName.free)
                    .map(team => (
                      <TeamDetail
                        key={team.teamName}
                        showDetails={false}
                        team={team}
                        users={state
                          .getIn(['dayUsers', state.get('selectedDay')])
                          .filter(
                            user => user.get('teamName') === team.teamName,
                          )
                          .filter(user => user.get('hoCount') > 0)}
                      />
                    ))}
              </StyledLegend>
            </StyledBody>
          </div>
        )}
      />
    );
  }
}

class AppWithHoc extends Component {
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
