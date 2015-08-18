import React, { Component } from 'react/addons';
import NavigationStore from '../stores/NavigationStore';
import MoviesListDetail from './MoviesListDetail';
import MovieDetail from './MovieDetail';
import ActivityDetail from './ActivityDetail';

const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
const VIEWS = {
  MoviesListDetail: MoviesListDetail,
  MovieDetail: MovieDetail,
  ActivityDetail: ActivityDetail
};

function getState() {
  return {
    selectedNavId: NavigationStore.getSelectedNav(),
    currentViewId: NavigationStore.getCurrentView(),
    currentViewProps: NavigationStore.getCurrentViewProps()
  };
}

export default class MainContent extends Component {
  state = getState()

  componentDidMount() {
    NavigationStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    NavigationStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {
    const CurrentView = VIEWS[this.state.currentViewId];
    return <div className='MainContent'>
      <ReactCSSTransitionGroup transitionName='content-transition' transitionLeave={false}>
        <CurrentView key={this.state.selectedNavId} {...this.state.currentViewProps} />
      </ReactCSSTransitionGroup>
      { /* these header buttons remain static while the rest of the center panel transitions */ }
      <div className='MainContent__header-buttons-container'>
        <a className='MainContent__header-button-reload ion-ios-refresh-empty' href='javascript:;'/>
        <a className='MainContent__header-button-logout ion-log-out' href='javascript:;'/>
      </div>
    </div>;
  }

  _onChange() {
    this.setState(getState());
  }
};