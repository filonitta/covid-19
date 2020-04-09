/* import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '@redux/reducers/index';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
 */
import React from 'react';

const Context = React.createContext();

export default Context;