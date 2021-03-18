import { combineReducers } from 'redux';

import alertReducer from './alerts';
import user from './user';
import message from './welcome';


export const reducers = combineReducers({ message,user,alertReducer });