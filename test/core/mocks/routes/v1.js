/**
 * Mock api route configuration
 */
import Immutable from 'immutable';
import express from 'express';
import { routeWrapper } from 'controllers/lib';

const v1 = express.Router();

// eslint-disable-next-line new-cap
let todos = Immutable.List([
  {
    id: 0,
    content: 'two',
    done: false,
  },
  {
    id: 1,
    content: 'one',
    done: false,
  },
]);

const getTodos = () => Promise.resolve({
  data: todos.toArray(),
  status: 200,
});

v1.get('/todos', routeWrapper(getTodos));

v1.post('/todos', routeWrapper((opt, data) => {
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
}));

export default v1;
export { getTodos };
