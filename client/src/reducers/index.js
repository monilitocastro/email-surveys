import { combineReducers } from 'redux';
import authReducer from './authreducer.js';
import surveyReducer from './surveyreducer.js';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  surveys: surveyReducer
})