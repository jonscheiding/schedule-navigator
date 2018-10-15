import { createStore } from 'redux';

import getInitialState from './get-initial-state';
import app from './reducers';

export default function() {
  return createStore(
    app, 
    getInitialState(),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
