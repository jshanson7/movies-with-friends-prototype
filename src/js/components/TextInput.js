import React, { Component } from 'react';

export default class Textinput extends Component {
  render() {
    return <input
      className='TextInput'
      type='text'
      placeholder='Search'
      {...this.props}
    />;
  }
};
