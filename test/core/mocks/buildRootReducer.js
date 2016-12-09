import { combineReducers } from 'redux';
import buildHelloReducer from 'test/core/mocks/buildHelloReducer';

export default initialState => combineReducers({
  /*
    initial state is in the form:
    {reducerName: 'reducerData'}

    extract the initial state for the reducer before passing it in
  */
  helloReducer: buildHelloReducer(initialState.helloReducer),
});
