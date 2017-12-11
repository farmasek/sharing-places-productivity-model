import React, { Component } from 'react';
import { initialState } from './model-definition/state';

export class LogicProvider extends Component {
  state = initialState;

  render() {
    console.log('state:', this.state.toJS());

    return this.props.render({ state: this.state });
  }
}
