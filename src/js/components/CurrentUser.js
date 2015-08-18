import React, { Component } from 'react';
import AvatarThumbnail from './AvatarThumbnail';

export default class CurrentUser extends Component {

  render() {
    return <div className='CurrentUser'>
      <div className='CurrentUser__avatar-container'>
        <AvatarThumbnail modifier='small' />
      </div>
      <div className='CurrentUser__name'>Jack Dorsey</div>
      <div className='CurrentUser__status ion-ios-circle-outline'></div>
    </div>;
  }
};
