import makeEventedStore from './helpers/makeEventedStore';
import fakeCollectionsList from 'json!../../data/collections_list.json';

let _collectionsList = fakeCollectionsList;

const CollectionsStore = makeEventedStore({
  getCollectionsList() {
    return _collectionsList;
  }
});

export default CollectionsStore;