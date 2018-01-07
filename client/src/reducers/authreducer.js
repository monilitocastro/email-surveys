import { FETCH_USER } from '../actions/types';

export default function counter(state = {}, action) {
    switch (action.type) {
      case FETCH_USER:
        console.log('ACTION', action)
        return {...state, user: action.user}
      default:
        return state
    }
  }