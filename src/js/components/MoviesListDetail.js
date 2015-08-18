import React, { Component } from 'react';
import { isNull, map, bind } from 'lodash';
import MoviesActions from '../actions/MoviesActions';
import NavigationStore from '../stores/NavigationStore';
import MoviesStore from '../stores/MoviesStore';
import ContentHeader from './ContentHeader';
import MoviesResults from './MoviesResults';
import { DISCOVER } from '../constants/MainNavOptions';
import { RELEASE_DATE, POPULARITY } from '../constants/SortOptions';


function getState() {
  return {
    selectedSortOption: MoviesStore.getCurrentSortBy()
  };
}

export default class MoviesListDetail extends Component {
  state = getState()

  static defaultProps = {
    moviesListType: DISCOVER,
    modelId: null,
    sortOptions: [
      {
        id: RELEASE_DATE,
        display: 'Release Date'
      },
      {
        id: POPULARITY,
        display: 'Popularity'
      }
    ]
  }

  componentDidMount() {
    this._onChange = this._onChange.bind(this);
    MoviesStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    MoviesStore.removeChangeListener(this._onChange);
  }

  render() {
    const selectedSortOption = this.state.selectedSortOption;
    const listType = this.props.moviesListType;
    return <div className='ContentWithHeader' {...this.props}>
      <ContentHeader headerText={NavigationStore.getSelectedNavOption().display}>
        <ul className='ContentHeader__header-nav'>{
          map(this.props.sortOptions, sortOption => {
            return <li
              key={sortOption.id}
              className={'ContentHeader__header-nav-option'}
              onClick={bind(this._onSortOptionClick, this, sortOption.id)}
              >
              <a className={'ContentHeader__header-nav-option-link' + (sortOption.id === selectedSortOption ? '--selected' : '')} href='javascript:;'>
                {sortOption.display}
              </a>
            </li>
          })
        }</ul>
      </ContentHeader>
      <div className='ContentBody'>{
        // TODO: show different results based on listType
        listType === DISCOVER ?
          <MoviesResults /> :
          <div className='EmptyContent'>{listType + (this.hasModel() ? ':' + this.props.modelId : '')}</div>
        }
      </div>
    </div>;
  }

  hasModel() {
    return !isNull(this.props.modelId);
  }

  _onSortOptionClick(sortOptionId) {
    MoviesActions.changeSortBy(sortOptionId);
  }

  _onChange() {
    this.setState(getState());
  }

};
