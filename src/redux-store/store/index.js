import { createStore } from 'redux';
import { rootReducers } from '../reducers/index';

export let store = createStore(rootReducers);

