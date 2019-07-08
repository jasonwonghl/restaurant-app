import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Api from '../Services/Api';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  restaurantsRequest: ['nextPageToken'],
  restaurantsSuccess: ['restaurantList', 'nextPageToken'],
  restaurantsFailure: null,
  restaurantsFavourite: ['favourites']
})

export const RestaurantsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  restaurantList: [],
  favourites: [],
  fetching: null,
  error: null,
  nextPageToken: null
})

/* ------------- Thunk ------------- */

export const fetchRestaurants = (nextPageToken) => {
  return (dispatch) => {

    const apiClient = new Api.create();

    apiClient.getRestaurants(nextPageToken)
      .then((res) => {
        // console.log('success', res.data.results.length)
        // alert('STATUS:' + res.data.status, 'ERROR MESSAGE:' + res.data.error_message)

        const nextPageToken = res.data.next_page_token ? res.data.next_page_token : null;
        
        if(res.data.results.length >= 1) {
          dispatch(Creators.restaurantsSuccess(res.data.results, nextPageToken))
        }
      })
      .catch(err => {
        alert(err)
        dispatch(Creators.restaurantsFailure())
        // console.log(err)
      })
  }
}

export const toggleFavourite = (favourites) => {
  return (dispatch) => {
    dispatch(Creators.restaurantsFavourite(favourites));
  }
}

/* ------------- Reducers ------------- */

// request restaurant data from api
export const request = (state, { params }) =>
  state.merge({ fetching: true, restaurantList: [] })

// successful api lookup
export const success = (state, action) => {
  const { restaurantList, nextPageToken } = action

  // Append new results to existing list
  let concatArray = [...state.restaurantList, ...restaurantList];
  
  // Filter out duplicates
  keys = ['name'],
  filtered = concatArray.filter(
      (s => o => 
          (k => !s.has(k) && s.add(k))
          (keys.map(k => o[k]).join('|'))
      )
      (new Set)
  )

  return state.merge({ fetching: false, error: null, restaurantList: filtered, nextPageToken })
}

// toggle favourite
export const favourite = (state, action) => {
  const { favourites } = action;
  return state.merge({ favourites });
}

// failure
export const failure = (state) =>
  state.merge({ fetching: false, error: true, restaurantList: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAURANTS_REQUEST]: request,
  [Types.RESTAURANTS_SUCCESS]: success,
  [Types.RESTAURANTS_FAILURE]: failure,
  [Types.RESTAURANTS_FAVOURITE]: favourite
})
