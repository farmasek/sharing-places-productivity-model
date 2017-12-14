import React, { Component } from 'react';
import { initialState } from './model-definition/state';
import { assignEmployeesToPlace } from './model-definition/place-assigner';
import { teamDefinitions } from './model-definition/definition-constants';

export class LogicProvider extends Component {
  state = {
    data: initialState(teamDefinitions),
    activeTeamDefinition: teamDefinitions,
    editingTeamDefinition: JSON.stringify(teamDefinitions, null, 2),
  };

  updateUserHOcount = (user, count) =>
    this.setState({
      data: this.state.data.setIn(['users', user.get('id'), 'hoCount'], count),
    });

  applyDataset = newDataset => {
    console.log('getting rect:', newDataset);


    this.setState({
      data: initialState(newDataset),
      activeTeamDefinition: newDataset,
      editingTeamDefinition: JSON.stringify(newDataset, null, 2)
    });
  };
  editTeamDefinition = e => {
    console.log('ee', e.target.value);
    this.setState({ editingTeamDefinition: e.target.value});
  };
  simulateReservationsForNextDay = () => {
    const { data, activeTeamDefinition } = this.state;
    const nextDay = data.get('dayPlaces').size;
    let nextState = data;
    const { dayPlaces, dayUsers } = assignEmployeesToPlace(
      activeTeamDefinition,
      nextDay <= 0 ? data.get('users') : data.getIn(['dayUsers', nextDay - 1]),
      data.get('places'),
    );
    // for (let i = 0; i < totalDays; i++) {
    nextState = nextState
      .setIn(['dayPlaces', nextDay], dayPlaces)
      .setIn(['dayUsers', nextDay], dayUsers);

    // }
    this.setState({ data: nextState });
  };
  selectDay = day => () =>
    this.setState({ data: this.state.data.set('selectedDay', day) });

  render() {
    console.log('state:', this.state.data.toJS());
    console.log('activeDefinition:', this.state.activeTeamDefinition);
    console.log('activeDefinition:', this.state.editingTeamDefinition);

    return this.props.render({
      state: this.state.data,
      simulateReservationsForNextDay: this.simulateReservationsForNextDay,
      selectDay: this.selectDay,
      updateUserHOcount: this.updateUserHOcount,
      applyDataset: this.applyDataset,
      activeTeamDefinition: this.state.activeTeamDefinition,
      editTeamDefinition: this.editTeamDefinition,
      editingTeamDefinition: this.state.editingTeamDefinition,
    });
  }
}
