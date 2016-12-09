/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-undef: 0 */
import { expect } from 'chai';
import * as actions from 'client/todos/store/actions';

const todoActionTypes = actions.todoActionTypes;

describe('Test todo store actions', () => {
  it('Should return an action for getTodos', (done) => {
    // setup data
    const expected = { type: todoActionTypes.GET_TODOS };

    // invoke
    const result = actions.getTodos();

    // assert
    expect(result).to.deep.equal(expected);
    done();
  });

  it('Should return an action for toggleTodo', (done) => {
    // setup data
    const todo = {
      id: 0,
      content: 'zero',
      done: false,
    };
    const expected = {
      type: todoActionTypes.TOGGLE_TODO,
      payload: [
        todo,
      ],
    };

    // invoke
    const result = actions.toggleTodo([todo]);

    // assert
    expect(result).to.deep.equal(expected);
    done();
  });

  it('Should return an action for addTodo', (done) => {
    // setup data
    const todo = {
      id: 0,
      content: 'zero',
      done: false,
    };
    const expected = {
      type: todoActionTypes.ADD_TODO,
      payload: [
        todo,
      ],
    };

    // invoke
    const result = actions.addTodo([todo]);

    // assert
    expect(result).to.deep.equal(expected);
    done();
  });

  it('Should return an action for hydrateTodoStore', (done) => {
    // setup data
    const todo = {
      id: 0,
      content: 'zero',
      done: false,
    };
    const expected = {
      type: todoActionTypes.HYDRATE,
      payload: [
        todo,
      ],
    };

    // invoke
    const result = actions.hydrateTodoStore([todo]);

    // assert
    expect(result).to.deep.equal(expected);
    done();
  });

  it('Should return an action for updateTodos', (done) => {
    // setup data
    const todo = {
      id: 0,
      content: 'zero',
      done: false,
    };
    const expected = {
      type: todoActionTypes.UPDATE_TODOS,
      payload: [
        todo,
      ],
    };

    // invoke
    const result = actions.updateTodos([todo]);

    // assert
    expect(result).to.deep.equal(expected);
    done();
  });

  it('Should return an action for deleteTodo', (done) => {
    // setup data
    const todo = {
      id: 0,
      content: 'zero',
      done: false,
    };
    const expected = {
      type: todoActionTypes.DELETE_TODO,
      payload: [
        todo,
      ],
    };

    // invoke
    const result = actions.deleteTodo([todo]);

    // assert
    expect(result).to.deep.equal(expected);
    done();
  });
});
