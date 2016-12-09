import { combineReducers } from 'redux';
import { buildTodoReducer } from 'client/todos/store';

export default initialState => combineReducers({
  todoReducer: buildTodoReducer(initialState.todoReducer),
});
