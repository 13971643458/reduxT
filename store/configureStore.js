/**
 * Created by liuwenxiang on 16/12/21.
 */
import { createStore, applyMiddleware , combineReducers} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers/user';
const middlewares = [thunk];

const crateStoreWithMiddleware  = applyMiddleware(...middlewares)(createStore);

function configureStore(initialState){

    const reducer = combineReducers(reducers);

    const store = crateStoreWithMiddleware(reducer,initialState);

    return store;
}

module.exports=configureStore;
