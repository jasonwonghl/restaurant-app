import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Api from '../Services/Api';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  restaurantsRequest: ['params'],
  restaurantsSuccess: ['restaurantList'],
  restaurantsFailure: null
})

export const RestaurantsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  restaurantList: null,
  fetching: null,
  error: null
})

/* ------------- Initial State ------------- */

export const fetchRestaurants = (params) => {
  return (dispatch) => {

    const apiClient = new Api.create();

    apiClient.getRestaurants()
      .then((res) => {
        dispatch(Creators.restaurantsSuccess(res.data.results))
      })
      .catch(err => {
        dispatch(Creators.restaurantsFailure())
        console.log(err)
      })
  }
}

/* ------------- Reducers ------------- */

// request restaurant data from api
export const request = (state, { params }) =>
  state.merge({ fetching: true, restaurantList: null })

// successful api lookup
export const success = (state, action) => {
  const { restaurantList } = action
  return state.merge({ fetching: false, error: null, restaurantList })
}

// failure
export const failure = (state) =>
  state.merge({ fetching: false, error: true, restaurantList: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAURANTS_REQUEST]: request,
  [Types.RESTAURANTS_SUCCESS]: success,
  [Types.RESTAURANTS_FAILURE]: failure
})
