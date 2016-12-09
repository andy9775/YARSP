import Immutable from 'immutable';
import { todoActionTypes } from 'client/todos/store/actions';


/**
 * Build the todo reducer ensuring that the initial state is an immutable array
 * @method buildTodoReducer
 * @param  {array}         initial - initial state of the store
 * @return {List}                  - the state of the reducer as an Immutable
 *                                   List
 */
export default function buildTodoReducer(initial) {
  /* eslint new-cap: 0*/
  const todos = initial ? Immutable.List(initial) : Immutable.List([]);
  return (state = todos, action) => {
    switch (action.type) {
      case todoActionTypes.ADD_TODO:
        return state.push(action.payload);
      case todoActionTypes.GET_TODOS:
        return state;
      case todoActionTypes.TOGGLE_TODO:
        return Immutable.List(action.payload);
      case todoActionTypes.HYDRATE:
        return Immutable.List(action.payload);
      case todoActionTypes.UPDATE_TODOS:
        return Immutable.List(action.payload);
      case todoActionTypes.DELETE_TODO:
        return Immutable.List(action.payload);
      default:
        return state;
    }
  };
}
