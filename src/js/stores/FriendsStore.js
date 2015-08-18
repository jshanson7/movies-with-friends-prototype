import makeEventedStore from './helpers/makeEventedStore';
import fakeFriendsList from 'json!../../data/friends_list.json';

let _friendsList = fakeFriendsList;

const FriendsStore = makeEventedStore({
  getFriendsList() {
    return _friendsList;
  }
});

export default FriendsStore;