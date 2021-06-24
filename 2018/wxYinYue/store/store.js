import { createStore } from '../libs/redux/redux.min.js';

import rootReducers from './reducers/index.js';

export default createStore(rootReducers);