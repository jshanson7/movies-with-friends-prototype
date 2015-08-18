import { map, range } from 'lodash';
import React, { Component } from 'react';
import Infinite from 'react-infinite';
import { PLAYING } from '../constants/MainNavOptions';

const MOVIE_OUTER_WIDTH = 162;
const MOVIE_ROW_HEIGHT = 286;
const MOVIES_LIST_HORIZONTAL_PADDING = 32;

function getMoviesPerRowForWidth(width) {
  const moviesPerRow = Math.floor((width - MOVIES_LIST_HORIZONTAL_PADDING) / MOVIE_OUTER_WIDTH);
  return moviesPerRow > 0 ?
    moviesPerRow : 1;
}

export default class MoviesResults extends Component {
  state = {
    moviesPerRow: 5,
    viewportHeight: 800
  }

  static defaultProps = {
    movies: [
    // example:
    // {
    //   "id": "771357161",
    //   "title": "Mission: Impossible Rogue Nation",
    //   "year": 2015,
    //   "runtime": 132,
    //   "genres": ["Action", "Adventure"]
    //   "thumbnail": "http://resizing.flixster.com/gbCU2qc5Edq9j-eJWBL9VN0BmZA=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/07/11190760_ori.jpg"
    // }
    ]
  }

  componentDidMount() {
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize);
  }

  render() {
    const movies = this.props.movies;
    const moviesPerRow = this.state.moviesPerRow;
    const numberOfRows = Math.ceil(movies.length / moviesPerRow);

    return <div className='MoviesList' {...this.props}>
      <Infinite className='MoviesList__viewport' containerHeight={this.state.viewportHeight} elementHeight={MOVIE_ROW_HEIGHT}>{
        map(range(numberOfRows), rowIndex => {
          return <div className='MoviesList__row' key={rowIndex}>{
            map(movies.slice(rowIndex * moviesPerRow, (rowIndex + 1) * moviesPerRow), movie => {
              return <div className='MoviesList__item' title={movie.title} key={movie.id}>
                <a className='MovieThumbnail' href={'#playing/' + movie.id}>
                  <img className='MovieThumbnail__poster' src={movie.thumbnail} />
                  <div className='MovieThumbnail__overlay-buttons'>
                    <div className='MovieThumbnail__play-button'>
                      <div className='MovieThumbnail__play-button-inner'/>
                    </div>
                  </div>
                </a>
                <div className='MoviesList__movie-details'>
                  <h4 className='MoviesList__movie-title'>{movie.title}</h4>
                  <div className='MoviesList__movie-genres'>{movie.genres.join(', ')}</div>
                  <div className='MoviesList__movie-runtime'>{movie.runtime + ' min'}</div>
                </div>
              </div>;
            })
          }</div>;
        })
      }</Infinite>
    </div>;
  }

  _onResize() {
    let node = React.findDOMNode(this);

    this.setState({
      moviesPerRow: getMoviesPerRowForWidth(node.offsetWidth),
      viewportHeight: node.offsetHeight
    });
  }

};
