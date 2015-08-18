import React, { Component } from 'react';
import TextInput from './TextInput'

export default class SearchInput extends Component {
  static defaultProps = {
    whiten: false
  }

  render() {
    const modifier = this.props.whiten ? '--white' : '';
    return <div className='SearchInput'>
      <TextInput className={'TextInput' + modifier} placeholder='Search...' {...this.props}/>
      <div className={'ion-ios-search-strong SearchInput__search-icon' + modifier}/>
    </div>;
  }
};
