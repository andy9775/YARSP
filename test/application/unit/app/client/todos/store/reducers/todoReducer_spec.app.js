/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-undef: 0 */
/* eslint new-cap: 0 */
import { expect } from 'chai';
import buildTodoReducer from 'client/todos/store/reducers';
import { todoActionTypes } from 'client/todos/store/actions';

const initialState = [
  {
    id: 0,
    content: 'zero',
    done: false,
  },
  {
    id: 1,
    content: 'one',
    done: false,
  },
];
const statefulReducer = buildTodoReducer(initialState);

describe('Test todos reducer', () => {
  it('Should return the default state for no action', (done) => {
    // invoke
    const result = statefulReducer(undefined, { type: undefined });

    // assert
    expect(result.toArray()).to.deep.equal(initialState);
    done();
  });

  it('Should return a new state for an ADD_TODO action', (done) => {
    // invoke
    const newTodo = {
      id: 2,
      content: 'two',
      done: false,
    };
    const result = statefulReducer(undefined, {
      type: todoActionTypes.ADD_TODO,
      payload: newTodo,
    });

    // assert
    expect(result.toArray()).to.deep.equal(initialState.concat(newTodo));
    done();
  });

  it('Should return todos for GET_TODOS action', (done) => {
    // invoke
    const result = statefulReducer(undefined, {
      type: todoActionTypes.GET_TODOS,
    });

    // assert
    expect(result.toArray()).to.deep.equal(initialState);
    done();
  });

  it('Should return todos for TOGGLE_TODO action', (done) => {
    // invoke
    const result = statefulReducer(undefined, {
      type: todoActionTypes.TOGGLE_TODO,
      payload: initialState,
    });

    // assert
    expect(result.toArray()).to.deep.equal(initialState);
    done();
  });

  it('Should return todos for HYDRATE action', (done) => {
    // invoke
    const result = statefulReducer(undefined, {
      type: todoActionTypes.HYDRATE,
      payload: initialState,
    });

    // assert
    expect(result.toArray()).to.deep.equal(initialState);
    done();
  });

  it('Should return todos for UPDATE_TODOS action', (done) => {
    // invoke
    const result = statefulReducer(undefined, {
      type: todoActionTypes.UPDATE_TODOS,
      payload: initialState,
    });

    // assert
    expect(result.toArray()).to.deep.equal(initialState);
    done();
  });

  it('Should return todos for DELETE_TODO action', (done) => {
    // invoke
    const result = statefulReducer(undefined, {
      type: todoActionTypes.DELETE_TODO,
      payload: initialState,
    });

    // assert
    expect(result.toArray()).to.deep.equal(initialState);
    done();
  });
});
