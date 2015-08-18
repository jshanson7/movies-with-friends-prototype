import React, { Component } from 'react';
import MoviesStore from '../stores/MoviesStore';
import MoviesList from './MoviesList';

function getState() {
  return {
    currentResults: MoviesStore.getCurrentResults()
    
    // example:
    // currentResults: [
    //   {
    //     "id": "771357161",
    //     "title": "Mission: Impossible Rogue Nation",
    //     "year": 2015,
    //     "runtime": 132,
    //     "genres": ["Action", "Adventure"]
    //     "thumbnail": "http://resizing.flixster.com/gbCU2qc5Edq9j-eJWBL9VN0BmZA=/52x81/dkpu1ddg7pbsk.cloudfront.net/movie/11/19/07/11190760_ori.jpg"
    //   }
    // ]
  };
}

export default class MoviesResults extends Component {
  state = getState()

  componentDidMount() {
    this._onResultsChange = this._onResultsChange.bind(this);
    MoviesStore.addChangeListener(this._onResultsChange);
  }

  componentWillUnmount() {
    MoviesStore.removeChangeListener(this._onResultsChange);
  }

  render() {
    return <div className='MoviesResults' {...this.props}>
      <MoviesList movies={this.state.currentResults}/>
    </div>;
  }

  _onResultsChange() {
    this.setState(getState())
  }

};
