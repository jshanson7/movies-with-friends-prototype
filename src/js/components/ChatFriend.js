import React, { Component } from 'react';
import AvatarThumbnail from './AvatarThumbnail';

export default class ChatFriend extends Component {
  static defaultProps = {
    name: '',
    watching: '',
    status: '',
    thumbnail: ''
  }

  render() {
    return <div className='ChatFriend' >
      <div className='ChatFriend__avatar-container'>
        <AvatarThumbnail/>
      </div>
      <div className='ChatFriend__details'>
        <div className='ChatFriend__name'>{this.props.name}</div>
        <div className='ChatFriend__watching'>{this.props.watching}</div>
      </div>
      <div className={'ChatFriend__status--' + this.props.status} />
    </div>;
  }
};
