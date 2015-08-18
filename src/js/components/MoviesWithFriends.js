import React, { Component } from 'react';
import SearchInput from './SearchInput';
import Navigation from './Navigation';
import MainContent from './MainContent';
import CurrentUser from './CurrentUser';
import ChatList from './ChatList';

export default class MoviesWithFriends extends Component {
  render() {
    return <div className='App'>
      <div className='App__panel--left'>
        <div className='ThumbPanel--red'>
          <div className='Container--full-center'>
            <SearchInput placeholder='Search movies...'/>
          </div>
        </div>
        <div className='Container--left-panel-navigation'>
          <Navigation/>
        </div>
      </div>
      <div className='App__panel--center'>
        <MainContent/>
      </div>
      <div className='App__panel--right'>
        <div className='ThumbPanel--blue'>
          <div className='Container--full-center'>
            <CurrentUser/>
          </div>
        </div>
        <div className='Container--right-panel-chat-list'>
          <ChatList/>
        </div>
        <div className='ThumbPanel--gray'>
          <div className='Container--full-center'>
            <SearchInput whiten={true} placeholder='Chat with...'/>
          </div>
        </div>
      </div>
    </div>;
  }
};
