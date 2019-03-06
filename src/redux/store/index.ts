import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from '../rootReducer';
import rootEpic from '../rootEpic';

const epicMiddleware = createEpicMiddleware<any, any, any>();

const store = createStore(rootReducer, applyMiddleware(epicMiddleware));

epicMiddleware.run(rootEpic);
export default store;
