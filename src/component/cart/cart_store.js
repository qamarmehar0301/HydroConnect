import {createStore, combineReducers} from 'redux';
import cartReducer from './cart_Reducer';

const rootReducer = combineReducers({
    cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
