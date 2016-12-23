/**
 * Created by liuwenxiang on 16/12/21.
 */
import { combineReducers } from 'redux';
import userReducer from './user';

export default combineReducers({
	userStore: userReducer,
});
