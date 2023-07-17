import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'store/reducers';
import rootSaga from 'store/sagas';

const sagaMiddleware = createSagaMiddleware();
export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
