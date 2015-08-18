import { map, findWhere, assign, sortByOrder } from 'lodash';
import { CHANGE_SORT_BY } from '../constants/Actions';
import makeEventedStore from './helpers/makeEventedStore';
import demoMoviesList from 'json!../../data/tmdb_movies_list.json';
import demoMoviesGenres from 'json!../../data/tmdb_genres_list.json';
import randomInt from '../utils/randomInt';
import NavigationStore from './NavigationStore';
import Dispatcher from '../dispatcher/Dispatcher';
import { RELEASE_DATE, POPULARITY } from '../constants/SortOptions';

const POSTER_WIDTH = 300;
const BASE_POSTER_URL = 'http://image.tmdb.org/t/p/w' + POSTER_WIDTH;

// patch demo api response
let _moviesList = map(demoMoviesList.results, movie => {
  return assign({}, movie, {
    genres: map(movie.genre_ids, genreId => findWhere(demoMoviesGenres.genres, { id: genreId}).name),
    // api doesn't have runtimes
    runtime: randomInt(75, 150),
    thumbnail: BASE_POSTER_URL + movie.poster_path
  });
});

let _currentResults = _moviesList.slice(0);
let _currentSortBy = POPULARITY;


function changeSortBy(id) {
  _currentSortBy = id;
}

function sortResults() {
  let sortByProp = null;
  switch (_currentSortBy) {
    case RELEASE_DATE:
      sortByProp = 'release_date';
      break;
    case POPULARITY:
      sortByProp = 'popularity';
      break;
  }

  _currentResults = sortByProp ?
    sortByOrder(_moviesList.slice(0), movie => {
      const sortByVal = movie[sortByProp];
      return _currentSortBy === RELEASE_DATE ?
        new Date(sortByVal).getTime() :
        sortByVal
    }, 'desc') :
    _currentResults;
}

const MoviesStore = makeEventedStore({
  getCurrentResults() {
    return _currentResults;
  },

  getCurrentSortBy() {
    return _currentSortBy;
  },

  getCurrentMoviesList() {
    return NavigationStore.getSelectedNav();
  }
});

Dispatcher.register(action => {
  switch(action.actionType) {
    case CHANGE_SORT_BY:
      changeSortBy(action.id);
      sortResults();
      MoviesStore.emitChange();
      break;

    default:
  }
});

sortResults();

export default MoviesStore;