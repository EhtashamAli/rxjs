// import { createStore, applyMiddleware } from 'redux';
// import { createEpicMiddleware } from 'redux-observable';

// import displayReducers from '../reducers';
// import {displayEpic} from '../epics'

// const epicMiddleware = createEpicMiddleware();

// export default store = createStore(
//     displayReducers,
//     applyMiddleware(epicMiddleware)
// )

// epicMiddleware.run(displayEpic);

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import {displayEpic} from '../epics'
import rootReducer from '../reducers'
const epicMiddleware = createEpicMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(displayEpic);

  export default store;
