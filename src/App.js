import React, { Component } from 'react';
import './App.css';
import { LogicProvider } from './LogicProvider';
import { PlaceField } from './Elements/PlaceField';
import styled from 'styled-components';
import { TeamDetail } from './Elements/TeamDetail';
import {
  allWorkingDataset,
  fullHo,
  noHoWithoutFree,
  reducedByHalf,
  reducingSeatsUsingHO,
  teamName,
  usingFreeSpacesNoHO,
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
        }) =>
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
                <Button onClick={() => applyDataset(usingFreeSpacesNoHO)}>
                  Nobody can HO but can seat on free workstations
                </Button>
                <Button onClick={() => applyDataset(noHoWithoutFree)}>
                  Nobody can HO and no free spaces, not enough workstations
                </Button>
                <Button onClick={() => applyDataset(reducingSeatsUsingHO)}>
                  Allowing HO reducing count of workstations
                </Button>
              </StyledHeaderCol>
            </StyledBody>
            <StyledBody>
              <StyledLegend>
                <h3>Legend:</h3>
                {activeTeamDefinition.map(team =>
                  <TeamDetail
                    key={team.teamName}
                    team={team}
                    users={state
                      .get('users')
                      .filter(user => user.get('teamName') === team.teamName)}
                  />
                )}
              </StyledLegend>
              <StyledSimulationBody>
                <div>
                  <Button
                    onClick={this.tryParseDataset(
                      editingTeamDefinition,
                      applyDataset
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
                    {state.get('selectedDay') > -1
                      ? activeTeamDefinition
                          .filter(team => team.teamName !== teamName.free)
                          .map(team =>
                            <TeamDetail
                              key={team.teamName}
                              showDetails={false}
                              team={team}
                              users={state
                                .getIn(['dayUsers', state.get('selectedDay')])
                                .filter(
                                  user => user.get('teamName') === team.teamName
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
                                          user.get('id')
                                      )
                                )}
                            />
                          )
                      : <p>No day selected.</p>}
                  </div>}
              </StyledSimulationBody>
              <StyledLegend>
                <Button onClick={simulateReservationsForWeek}>
                  Simulate reservations
                </Button>
                <br />
                <h4>Select day</h4>
                <Button onClick={selectDay(-1)}>Default day</Button>
                <br />
                {state.get('dayPlaces').toIndexedSeq().map((val, num) =>
                  <Button
                    active={state.get('selectedDay') === num}
                    key={num}
                    onClick={selectDay(num)}
                  >
                    {num + 1}
                  </Button>
                )}
                <p>HO left</p>
                {state.get('selectedDay') > -1 &&
                  activeTeamDefinition
                    .filter(team => team.teamName !== teamName.free)
                    .map(team =>
                      <TeamDetail
                        key={team.teamName}
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
            </StyledBody>
          </div>}
      />
    );
  }
}

export default App;
