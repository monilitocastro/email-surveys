import { FETCH_SURVEYS } from '../actions/types';

export default function counter(state = {}, action) {
    switch (action.type) {
      case FETCH_SURVEYS:
        return {...state, surveys: action.surveys}
      default:
        return state
    }
  }