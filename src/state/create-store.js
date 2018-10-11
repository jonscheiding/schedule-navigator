import { createStore } from 'redux';

import getInitialState from './get-initial-state';
import app from './reducers';

export default function() {
  return createStore(app, getInitialState());
}
