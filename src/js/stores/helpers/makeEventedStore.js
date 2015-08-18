import { assign } from 'lodash';
import { EventEmitter } from 'events';
import { CHANGE_EVENT } from '../../constants/Events';

export default options => assign({}, EventEmitter.prototype, {
  addChangeListener(cb) {
    return this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    return this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange() {
    return this.emit(CHANGE_EVENT);
  }
}, options);