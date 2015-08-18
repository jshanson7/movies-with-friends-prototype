import React, { Component } from 'react';
import NavigationStore from '../stores/NavigationStore';
import ContentHeader from './ContentHeader';

export default class MovieDetail extends Component {
  render() {
    return <div className='MovieDetail' {...this.props}>
      <ContentHeader headerText={NavigationStore.getSelectedNavOption().display} />
      <div className='ContentBody--padded'>{this.props.children}</div>
    </div>;

  }
};
