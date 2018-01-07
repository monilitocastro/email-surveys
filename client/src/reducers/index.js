import { combineReducers } from 'redux'
import authReducer from './authreducer.js'

export default combineReducers({
  auth: authReducer
})