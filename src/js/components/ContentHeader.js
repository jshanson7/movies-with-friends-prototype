import React, { Component } from 'react';

export default class ContentHeader extends Component {
  static defaultProps = {
    headerText: 'Discover'
  }

  render() {
    return <div className='ContentHeader' {...this.props}>
      <div className='ContentHeader__header-text-container'>
        <h1 className='ContentHeader__header-text'>{this.props.headerText}</h1>
      </div>
      <div className='ContentHeader__header-nav-container'>{this.props.children}</div>
    </div>;
  }
};
