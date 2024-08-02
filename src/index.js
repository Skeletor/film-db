import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MovieList from './components/movie-list';
import ErrorBox from './components/error-box';
import SearchInput from './components/search-input';
import MoviePagination from './components/movie-pagination';

import ApiHandler from './service/api-handler';
import NetworkStateListener from './service/network-state-listener';
import Constants from './constants';

import { Tabs } from 'antd'

import GenresContext from './service/context/genres-context';

export default class App extends Component {

  state = {
    movies: {
      movies: [],
      genres: [],
      totalMovies: 0,
    },
    isLoading: true,
    error: {
      hasError: false,
      errorMessage: ''
    },
    isConnected: true,
    currentSearchText: '',
    currentSearchPage: 1,
    currentRatePage: 1
  }

  onSearchMovies = (text) => {
    const { currentSearchPage } = this.state
    this.searchMovies(text, currentSearchPage)
  }

  onSearchPageChanged = (page) => {
    const { currentSearchText } = this.state
    this.searchMovies(currentSearchText, page)
  }

  onRatedPageChanged = (page) => {
    this.getRatedMovies(page)
  }

  onTabChanged = (key) => {
    const { currentSearchText, currentSearchPage, currentRatePage } = this.state
      if (key === '1') {
        this.searchMovies(currentSearchText, currentSearchPage)
      } else {
        this.getRatedMovies(currentRatePage)
      }
  }

  getRatedMovies = async (page) => {
    this.setState({
      isLoading: true,
      currentRatePage: page
    })

    ApiHandler.getRatedMovies(page).then((response) => {
      if (!response.results)
        throw new Error(response.status_message)

      this.setMovies({
        movies: response.results,
        totalMovies: response.total_results
      })
    }).catch((reason) => {
      this.setError(reason)
    })
  }

  searchMovies = (text, page) => {
    this.setState({
      isLoading: true,
      currentSearchText: text,
      currentSearchPage: page
    })

    ApiHandler.getMoviesBySearch(text, page).then((response) => {
      if (!response.results)
        throw new Error(response.status_message)
      
      this.setMovies({
        movies: response.results,
        totalMovies: response.total_results
      })
    }).catch((reason) => {
      this.setError(reason)
    })

    ApiHandler.getGenres().then(response => {
      this.setState({
        movies: {
          ...this.state.movies,
          genres: response.genres
        }
      })
    })
  }

  componentDidMount() {
    NetworkStateListener((connected) => {
      this.setState({
        isConnected: connected
      })
    })

    this.searchMovies();
  }

  componentDidCatch(err) {
    console.log('!!! Catch !!!', err)
    this.setError(err)
  }

  setError = (err) => {
    this.setState({
      error: {
        hasError: true,
        errorMessage: err
      },
      isLoading: false
    })
  }

  setMovies = (object) => {
    const { movies, totalMovies } = object
    
    this.setState({
      movies: {
        ...this.state.movies,
        movies: movies,
        totalMovies: totalMovies
      },
      error: {},
      isLoading: false
    })
  }

  render() {
    const { 
      isConnected, 
      isLoading, 
      error, 
      movies,
      currentSearchPage,
      currentRatePage
    } = this.state

    if (error.hasError)
      return <ErrorBox message={ `${error.errorMessage}` } />

    if (!isConnected)
      return <ErrorBox message={ Constants.NoInternetConnection } />

    const searchTab = <>
      <SearchInput onSearch={ this.onSearchMovies } />

      <GenresContext.Provider value={ movies.genres }>
        <MovieList films={ movies.movies }
                   isLoading={ isLoading }
                   totalFilms={ movies.totalMovies } />
      </GenresContext.Provider>

      <MoviePagination total={ movies.totalMovies }
                       currentPage={ currentSearchPage }
                       onPageChanged={ this.onSearchPageChanged } />
    </>

    const rateTab = <>
      <GenresContext.Provider value={ movies.genres }>
        <MovieList films={ movies.movies }
                   isLoading={ isLoading }
                   totalFilms={ movies.totalMovies }
                   displayStars />
      </GenresContext.Provider>

      <MoviePagination total={ movies.totalMovies }
                       currentPage={ currentRatePage }
                       onPageChanged={ this.onRatedPageChanged } />
    </>

    const tabItems = [
      {
        label: 'Search',
        key: '1',
        children: searchTab
      },
      {
        label: 'Rated',
        key: '2',
        children: rateTab
      }
    ]                 

    return (
      <Tabs items={ tabItems } 
            centered 
            onChange={ this.onTabChanged }/>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));
