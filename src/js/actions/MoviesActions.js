import Dispatcher from '../dispatcher/Dispatcher';
import Actions from '../constants/Actions';

export default {  
  changeSortBy: sortById => Dispatcher.dispatch({
    actionType: Actions.CHANGE_SORT_BY,
    id: sortById
  })
};