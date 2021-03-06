import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// Init State
const initState = {
  watchlist: localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [],
  watched: localStorage.getItem('watched') ? JSON.parse(localStorage.getItem('watched')) : []
}

// Create contect
export const GlobalContext = createContext(initState)

// Provider component
export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initState)

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist))
    localStorage.setItem('watched', JSON.stringify(state.watched))
  }, [state]);

  // Action
  const addMovieToWatchlist = movie => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie })
  }
  const addMovieToWatched = movie => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie })
  }

  return (<GlobalContext.Provider value={{ watchlist: state.watchlist, watched: state.watched, addMovieToWatchlist, addMovieToWatched }}>
    {props.children}
  </GlobalContext.Provider>)
}