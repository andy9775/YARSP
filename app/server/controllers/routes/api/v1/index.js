/**
 * Version 1 of the application api.
 *
 * Define server routes based on api end points and define the api handler
 * function as wrapped by the route wrapper.
 *
 * e.g.
 *  router.get('/user', routerWrapper(api.user.getUser));
 */

import express from 'express';
import todoList from 'controllers/api/v1';
import { routeWrapper } from 'controllers/lib';

const v1 = express.Router();

// handle requests to get todo items
v1.get('/todos', routeWrapper(todoList.getTodos));

// handle requests to post a new todo item
v1.post('/todos', routeWrapper(todoList.postTodo));

// handle requests to put a todo item (insert or modify)
v1.put('/todos', routeWrapper(todoList.putTodo));

// handle deleting a todo
v1.delete('/todos', routeWrapper(todoList.deleteTodo));

export default v1;
