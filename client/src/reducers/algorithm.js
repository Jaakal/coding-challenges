import { ADD_ALGORITHM, SET_ACTIVE_ALGORITHM, REMOVE_ACTIVE_ALGORITHM } from '../actions/types'

const initialState = {
  algorithms: {},
  activeAlgorithm: null,
  algorithmRunning: false
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_ALGORITHM:
      return {
        ...state,
        algorithms: { ...state.algorithms, ...payload }
      }
    case SET_ACTIVE_ALGORITHM:
      return {
        ...state,
        activeAlgorithm: payload
      }
    case REMOVE_ACTIVE_ALGORITHM:
      return {
        ...state,
        activeAlgorithm: null
      }
    default:
      return state;
  }
}