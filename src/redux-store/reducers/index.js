import { combineReducers } from 'redux';
import { ecommerceState, userCart, userWishListsState } from './reducers';

export let rootReducers = combineReducers({ ecommerceState, userCart, userWishListsState });