import * as todoActionTypes from 'client/todos/store/actions/types';

export function getTodos() {
  return { type: todoActionTypes.GET_TODOS };
}

export function toggleTodo(payload) {
  return {
    type: todoActionTypes.TOGGLE_TODO,
    payload,
  };
}

export function addTodo(payload) {
  return {
    type: todoActionTypes.ADD_TODO,
    payload,
  };
}

export function hydrateTodoStore(payload) {
  return {
    type: todoActionTypes.HYDRATE,
    payload,
  };
}

export function updateTodos(payload) {
  return {
    type: todoActionTypes.UPDATE_TODOS,
    payload,
  };
}

export function deleteTodo(payload) {
  return {
    type: todoActionTypes.DELETE_TODO,
    payload,
  };
}

export { todoActionTypes };
