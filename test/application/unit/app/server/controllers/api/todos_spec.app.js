/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-undef: 0 */
/* eslint new-cap: 0*/
import { expect } from 'chai';
import Immutable from 'immutable';
import rewire from 'rewire';
import mockery from 'mockery';
import { buildImmutableMock } from 'test/application/mocks';

const mockTodosList = [
  {
    id: 0,
    content: 'zero',
    done: true,
  },
  {
    id: 1,
    content: 'one',
    done: false,
  },
];
const ImmutableMock = buildImmutableMock(mockTodosList);

describe('Test API handlers', () => {
  let todoList;

  before(() => {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock('immutable', ImmutableMock);

    // eslint-disable-next-line global-require
    todoList = require('controllers/api/v1/todos');
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('Should fetch todos and return expected todo list',
    () =>
    // invoke
    todoList.getTodos()
      .then((result) => {
        // assert
        expect(result.data).to.deep.equal(mockTodosList);
      })
  );

  it('Should post todos and return the new todo list',
    () => {
      // setup data
      const content = 'two';
      const newTodo = {
        id: mockTodosList[mockTodosList.length - 1].id + 1,
        content,
        done: false,
      };
      const expectedPost = mockTodosList
        .concat(newTodo);

      // incoke
      return todoList.postTodo({ }, { content })
        .then((result) => {
          // assert
          expect(result.data).to.deep.equal(expectedPost);
        });
    }
  );
});


describe('Test API helper methods', () => {
  it('Should identify the index of the todo item', () => {
    const rewiredTodos = rewire(
      '../../../../../../../app/server/controllers/api/v1/todos'
    );
    const getTodoIndex = rewiredTodos.__get__('getTodoIndex');

    // setup data
    const todoEntry = {
      id: 2,
      content: 'two',
      done: false,
    };
    const mockTodoList = Immutable.List([
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
      {
        id: 2,
        content: 'two',
        done: false,
      },
    ]);
    // invoke/assert
    expect(getTodoIndex(mockTodoList, todoEntry)).to.equal(2);
  });
});
