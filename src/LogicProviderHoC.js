import React, { Component } from 'react';
import { initialState } from './model-definition/state';
import { assignEmployeesToPlace } from './model-definition/place-assigner';
import { Range } from 'immutable';
import { teamDefinitions } from './model-definition/definition-constants';

export const withLogic = WrappedComponent =>
  class LogicProvider extends Component {
    state = {
      data: initialState(teamDefinitions),
      activeTeamDefinition: teamDefinitions,
      editingTeamDefinition: JSON.stringify(teamDefinitions, null, 2),
    };

    updateUserHOcount = (user, count) =>
      this.setState({
        data: this.state.data.setIn(
          ['users', user.get('id'), 'hoCount'],
          count
        ),
      });

    applyDataset = newDataset => {
      this.setState({
        data: initialState(newDataset),
        activeTeamDefinition: newDataset,
        editingTeamDefinition: JSON.stringify(newDataset, null, 2),
      });
    };
    editTeamDefinition = e => {
      this.setState({ editingTeamDefinition: e.target.value });
    };
    simulateReservationsForNextDay = () => {
      const { data, activeTeamDefinition } = this.state;
      const nextDay = data.get('dayPlaces').size;
      let nextState = data;
      const { dayPlaces, dayUsers } = assignEmployeesToPlace(
        activeTeamDefinition,
        nextDay <= 0
          ? data.get('users')
          : data.getIn(['dayUsers', nextDay - 1]),
        data.get('places'),
        nextDay
      );
      nextState = nextState
        .setIn(['dayPlaces', nextDay], dayPlaces)
        .setIn(['dayUsers', nextDay], dayUsers);

      this.setState({ data: nextState });
    };

    simulateReservationsForWeek = () => {
      const range = Range(0, 5);
      const { data, activeTeamDefinition } = this.state;
      let nextState = data;
      range.forEach(nextDay => {
        const { dayPlaces, dayUsers } = assignEmployeesToPlace(
          activeTeamDefinition,
          nextDay <= 0
            ? nextState.get('users')
            : nextState.getIn(['dayUsers', nextDay - 1]),
          nextState.get('places'),
          nextDay
        );
        nextState = nextState
          .setIn(['dayPlaces', nextDay], dayPlaces)
          .setIn(['dayUsers', nextDay], dayUsers);
      });
      this.setState({ data: nextState });
    };
    selectDay = day => () =>
      this.setState({ data: this.state.data.set('selectedDay', day) });

    render() {
      return (
        <WrappedComponent
          state={this.state.data}
          simulateReservationsForNextDay={this.simulateReservationsForNextDay}
          selectDay={this.selectDay}
          updateUserHOcount={this.updateUserHOcount}
          applyDataset={this.applyDataset}
          activeTeamDefinition={this.state.activeTeamDefinition}
          editTeamDefinition={this.editTeamDefinition}
          editingTeamDefinition={this.state.editingTeamDefinition}
          simulateReservationsForWeek={this.simulateReservationsForWeek}
          {...this.props}
        />
      );
    }
  };
