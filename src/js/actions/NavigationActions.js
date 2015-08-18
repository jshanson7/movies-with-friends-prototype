import Dispatcher from '../dispatcher/Dispatcher';
import Actions from '../constants/Actions';

export default {
  changeNav: navId => Dispatcher.dispatch({
    actionType: Actions.CHANGE_NAV,
    id: navId
  })
};