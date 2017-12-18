import React, { Component } from 'react';
import { initialState } from './model-definition/state';
import { assignEmployeesToPlace } from './model-definition/place-assigner';

export const withLogic = Component =>
  class LogicProviderHoC extends Component {
    state = { data: initialState };

    updateUserHOcount = (user, count) =>
      this.setState({
        data: this.state.data.setIn(
          ['users', user.get('id'), 'hoCount'],
          count
        ),
      });

    simulateReservationsForNextDay = () => {
      const { data } = this.state;
      const nextDay = data.get('dayPlaces').size;
      let nextState = data;
      const { dayPlaces, dayUsers } = assignEmployeesToPlace(
        nextDay <= 0
          ? data.get('users')
          : data.getIn(['dayUsers', nextDay - 1]),
        data.get('places')
      );
      nextState = nextState
        .setIn(['dayPlaces', nextDay], dayPlaces)
        .setIn(['dayUsers', nextDay], dayUsers);

      this.setState({ data: nextState });
    };
    selectDay = day => () =>
      this.setState({ data: this.state.data.set('selectedDay', day) });

    render() {
      return this.props.render({
        state: this.state.data,
        simulateReservationsForNextDay: this.simulateReservationsForNextDay,
        selectDay: this.selectDay,
        updateUserHOcount: this.updateUserHOcount,
      });
    }
  };
