import { map, partial, snakeCase, findWhere } from 'lodash';
import { CHANGE_NAV } from '../constants/Actions';
import { PLAYING, DISCOVER, ACTIVITY, TOP_CHARTS, NEW_RELEASES } from '../constants/MainNavOptions';
import { MAIN, CIRCLES, COLLECTIONS } from '../constants/NavSections';
import makeEventedStore from './helpers/makeEventedStore';
import Dispatcher from '../dispatcher/Dispatcher';
import CirclesStore from './CirclesStore';
import CollectionsStore from './CollectionsStore';

let _selectedNav = DISCOVER;

const staticNavSections = [
  { id: MAIN, display: 'Main' },
  { id: CIRCLES, display: 'Your Movie Circles' },
  { id: COLLECTIONS, display: 'Collections' }
];

const staticNavOptions = [
  {
    id: PLAYING,
    display: 'Playing',
    href: '#playing',
    icon_url: '',
    nav_section: MAIN
  },
  {
    id: DISCOVER,
    display: 'Discover',
    href: '#discover',
    icon_url: '',
    nav_section: MAIN
  },
  {
    id: ACTIVITY,
    display: 'Activity',
    href: '#activity',
    icon_url: '',
    nav_section: MAIN
  },
  {
    id: TOP_CHARTS,
    display: 'Top Charts',
    href: '#top_charts',
    icon_url: '',
    nav_section: MAIN
  },
  {
    id: NEW_RELEASES,
    display: 'New Releases',
    href: '#new_releases',
    icon_url: '',
    nav_section: MAIN
  }
];

function changeNav(id) {
  _selectedNav = id;
}

function getDynamicNavOptions() {
  const makeDynamicNavOption = (sectionId, model) => {
    return {
      id: sectionId + ':' + model.id,
      display: model.name,
      href: '#' + snakeCase(sectionId) + '/' + model.id,
      icon_url: model.icon_url,
      nav_section: sectionId,
      model_id: model.id
    };
  };

  return [].concat(
    map(CirclesStore.getCirclesList(), partial(makeDynamicNavOption, CIRCLES)),
    map(CollectionsStore.getCollectionsList(), partial(makeDynamicNavOption, COLLECTIONS))
  );
}

const NavigationStore = makeEventedStore({
  getSelectedNav() {
    return _selectedNav;
  },
  getNavSections() {
    return staticNavSections;
  },
  getNavOptions() {
    return staticNavOptions.concat(getDynamicNavOptions());
  },
  getSelectedNavOption() {
    return findWhere(this.getNavOptions(), { id: this.getSelectedNav() });
  },

  // TODO: offload this logic to a declarative router
  getCurrentView() {
    const nav = this.getSelectedNavOption();
    const navId = nav.id;
    const navSection = nav.nav_section;
    switch (true) {
      case navId === PLAYING:
        return 'MovieDetail';
      case navId === DISCOVER:
      case navId === TOP_CHARTS:
      case navId === NEW_RELEASES:
      case navSection === CIRCLES:
      case navSection === COLLECTIONS:
        return 'MoviesListDetail';
      case navId === ACTIVITY:
        return 'ActivityDetail';
      default:
        // noop
    }
  },
  getCurrentViewProps() {
    const nav = this.getSelectedNavOption();
    const navId = nav.id;
    const navSection = nav.nav_section;
    switch (true) {
      case navId === PLAYING:
        return {
          children: PLAYING
        };
      case navId === DISCOVER:
      case navId === TOP_CHARTS:
      case navId === NEW_RELEASES:
        return { moviesListType: navId };
      case navSection === CIRCLES:
        return {
          moviesListType: CIRCLES,
          modelId: nav.model_id,
          children: CIRCLES + ':' + nav.model_id
        };
      case navSection === COLLECTIONS:
        return {
          moviesListType: COLLECTIONS,
          modelId: nav.model_id,
          children: COLLECTIONS + ':' + nav.model_id
        };
      case navId === ACTIVITY:
        return { children: ACTIVITY };
      default:
        // noop
    }
  }
});

Dispatcher.register(action => {
  switch(action.actionType) {
    case CHANGE_NAV:
      changeNav(action.id)
      NavigationStore.emitChange();
      break;

    default:
  }
});

export default NavigationStore;