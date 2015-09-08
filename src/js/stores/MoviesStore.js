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
let _moviesList = map(demoMoviesList.results, movie => assign({}, movie, {
  genres: map(movie.genre_ids, genreId => findWhere(demoMoviesGenres.genres, { id: genreId}).name),
  // api doesn't have runtimes
  runtime: randomInt(75, 150),
  thumbnail: BASE_POSTER_URL + movie.poster_path
}));

let _currentResults = _moviesList.slice(0);
let _currentSortBy = POPULARITY;


function changeSortBy(id) {
  _currentSortBy = id;
}

function sortResults() {
  switch (_currentSortBy) {
    case RELEASE_DATE:
      _currentResults = sortByOrder(_moviesList, movie => new Date(movie['release_date']).getTime(), 'desc');
      break;
    case POPULARITY:
      _currentResults = sortByOrder(_moviesList, movie => movie['popularity'], 'desc');
      break;
  }
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