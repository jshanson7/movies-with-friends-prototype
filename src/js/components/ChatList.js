import React, { Component } from 'react';
import { map, filter, where } from 'lodash';
import ChatFriend from './ChatFriend';
import FriendsStore from '../stores/FriendsStore';

export default class ChatList extends Component {
  render() {
    const friends = FriendsStore.getFriendsList();

    return <div className='ChatList' >
      <ul className='ChatList__sections'>
        <li className='ChatList__section' key='1'>
          <h3 className='ChatList__section-header'>Online</h3>
          <ul className='ChatUserList'>{
            map(filter(friends, friend => friend.status !== 'away'), (friend, index) => {
              return <li className='ChatUserList__item' key={index}>
                <ChatFriend {...friend}/>
              </li>
            })
          }</ul>
        </li>
        <li className='ChatList__section' key='2'>
          <h3 className='ChatList__section-header'>Offline</h3>
          <ul className='ChatUserList'>{
            map(where(friends, { status: 'away'}), (friend, index) => {
              return <li className='ChatUserList__item' key={index}>
                <ChatFriend {...friend}/>
              </li>
            })
          }</ul>
        </li>
      </ul>
    </div>;
  }
};
