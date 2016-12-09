import Promise from 'bluebird';
import Immutable from 'immutable';
import _ from 'lodash';

// mock todos list fixture
/* eslint new-cap: 0 */
let todos = Immutable.List([
  {
    id: 0,
    content: 'Buy pizza',
    done: false,
  },
  {
    id: 1,
    content: 'Pay bills',
    done: false,
  },
]);


// ============================= helper functions ==============================

/**
 * Fetch the index of the identified todo item
 * @method getTodoIndex
 * @param  {Array}      list - list to search
 * @param  {object}     data - the item whose index we want to find
 * @return {number}          - the index if found, else -1
 */
function getTodoIndex(list, data) {
  return list.reduce((accum, item, i) => {
    if (data.id === item.id) {
      return i;
    }
    return accum;
  }, -1);
}

// ============================== route handlers ===============================

/**
 * Handle getting a list of todo's
 * @method getTodos
 * @param  {object} opt  - request options data
 * @param  {object} data - request data
 * @return {Promise}
 */
export function getTodos(opt, data) {
  return Promise.resolve({
    data: todos.toArray(),
    status: 200,
  });
}

/**
 * Handle posting a todo
 *
 * @method postTodos
 * @param  {object}  opt  - request options
 * @param  {object}  data - request data
 * @return {Promise}
 */
export function postTodo(opt, data) {
  const id = todos.last().id + 1;
  const done = false;
  const content = data.content;
  const todo = {
    id,
    done,
    content,
  };

  todos = todos.push(todo);
  return Promise.resolve({
    data: todos.toArray(),
    status: 200,
  });
}

/**
 * Handle put requests.
 *
 * Either modify the existing todo item, or insert a new one
 *
 * @method putTodo
 * @param  {object} opt  - request options
 * @param  {object} data - request data
 * @return {Promise}
 */
export function putTodo(opt, data) {
  const index = data.id !== undefined ? getTodoIndex(todos, data) : -1;

  if (index === -1) { // doesn't exist in the store
    return postTodo(opt, data);
  }

  const _data = _.clone(todos.get(index));
  _data.done = !_data.done;
  todos = todos.set(index, _data);
  return Promise.resolve({
    data: todos.toArray(),
    status: 200,
  });
}

/**
 * Handle requests to delete a todo item
 * @method deleteTodo
 * @param  {object} opt  - request options
 * @param  {object} data - request data
 * @return {Promise}
 */
export function deleteTodo(opt, data) {
  const index = getTodoIndex(todos, data);
  todos = todos.delete(index);
  return Promise.resolve({
    data: todos.toArray(),
    status: 200,
  });
}
