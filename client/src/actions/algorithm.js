import { ADD_ALGORITHM, GET_ALGORITHMS, GET_ACTIVE_ALGORITHM, SET_ACTIVE_ALGORITHM, REMOVE_ACTIVE_ALGORITHM } from './types'

export const getAlgorithms = () => dispatch => {
  dispatch({
    type: GET_ALGORITHMS
  })
}

export const addAlgorithm = payload => dispatch => {
  dispatch({
    type: ADD_ALGORITHM,
    payload
  })
}

export const getActiveAlgorithm = () => dispatch => {
  dispatch({
    type: GET_ACTIVE_ALGORITHM
  })
}

export const setActiveAlgorithm = payload => dispatch => {
  dispatch({
    type: SET_ACTIVE_ALGORITHM,
    payload
  })
}

export const removeActiveAlgorithm = () => dispatch => {
  dispatch({
    type: REMOVE_ACTIVE_ALGORITHM
  })
}