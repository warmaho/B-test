import { combineReducers } from 'redux'
import * as types from './types'

const top20State = {
  top20: [],
  loading: false,
  error:false
}

const top20Reducer = (state = top20State, { type, payload }) => {
  switch (type) {
    case types.TOP20DATA:
      return {
        top20: payload,
        loading: false
      }
    case types.TOP20LOADING:
      return {
        ...top20State,
        loading: true
      }
    case types.TOP20ERROR:
      return {
        ...top20State,
        error: true
      }
    default:
      return state
  }
}

const commitsState = {
  commits: [],
  loading: false,
  error:false
}

const commitsReducer = (state = commitsState, { type, payload }) => {
  switch (type) {
    case types.COMMITS:
      return {
        commits: payload,
        loading: false
      }
    case types.COMMITSLOADING:
      return {
        ...commitsState,
        loading: true
      }
    case types.COMMITSERROR:
      return {
        ...commitsState,
        error: true
      }
    default:
      return state
  }
}

const reducers = {
  top20: top20Reducer,
  commits: commitsReducer,
}

export default combineReducers(reducers)
