import makeEventedStore from './helpers/makeEventedStore';
import fakeCiclesList from 'json!../../data/circles_list.json';

let _circlesList = fakeCiclesList;

const CirclesStore = makeEventedStore({
  getCirclesList() {
    return _circlesList;
  }
});

export default CirclesStore;