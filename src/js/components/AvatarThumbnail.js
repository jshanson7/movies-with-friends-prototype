import React, { Component } from 'react';

export default class AvatarThumbnail extends Component {
  static defaultProps = {
    modifier: ''
  }

  render() {
    return <div className={'AvatarThumbnail' + (this.props.modifier ? '--' + this.props.modifier : '')}>
      <img className='AvatarThumbnail__image'/>
    </div>
  }
};
