/* eslint func-names: 0*/
/* eslint space-before-function-paren: 0*/
import _ from 'lodash';

/**
 * Mock Immutable List builder.
 *
 * Pass in the initial data value in order to override the creation of the
 * Immutable List with the initial data. Any calls to Immutable.List will create
 * a new Immutable List with the mock data.
 *
 * e.g.
 * const Imm = buildImmutableList([1, 2, 3]);
 * const imm = Imm.List([4, 5, 6]);
 * expect(imm.toArray()).to.deep.equal([1, 2, 3]); // true
 *
 * @method buildImmutableList
 * @param  {object}           initial - initial state of the immutable store
 * @return {object}                   - An object with static builder methods
 */
export default function buildImmutableMock(initial) {
  /**
   * Mock Immutable.List object. This does not act fully like an Immutable List
   * meaning it does not return a new List for each method invocation
   *
   * WARNING: Not all methods are implemented, only the ones used in
   * this project
   */
  function MockImmutableList(state) {
    MockImmutableList.array = initial || state;
  }

  MockImmutableList.prototype.toArray = function() {
    return MockImmutableList.array;
  };

  MockImmutableList.prototype.last = function() {
    return MockImmutableList.array[MockImmutableList.array.length - 1];
  };

  MockImmutableList.prototype.get = function(index) {
    return MockImmutableList.array[index];
  };

  MockImmutableList.prototype.push = function(data) {
    const arr = _.cloneDeep(MockImmutableList.array);
    arr.push(data);
    MockImmutableList.array = arr;
    return this;
  };

  MockImmutableList.prototype.set = function(index, data) {
    MockImmutableList.array[index] = data;
    return this;
  };

  MockImmutableList.prototype.delete = function(index) {
    if (index >= MockImmutableList.array.length || index === -1) {
      return this;
    }
    let arr = _.cloneDeep(MockImmutableList.array);
    if (index === 0) {
      arr = arr.slice(1);
    } else if (index === MockImmutableList.array.length - 1) {
      arr = arr.slice(0, MockImmutableList.array.length - 1);
    } else {
      arr = arr
        .slice(0, index)
        .concat(MockImmutableList.array.slice(index + 1,
          MockImmutableList.array.length));
    }
    MockImmutableList.array = arr;
    return this;
  };

  MockImmutableList.prototype.reduce = function(func, accum) {
    return MockImmutableList.array.reduce(func, accum);
  };

  MockImmutableList.prototype.map = function(func, thisArg) {
    return MockImmutableList.array.map(func, thisArg);
  };

  MockImmutableList.prototype.reset = function() {
    MockImmutableList.array = initial;
  };

  const ImmutableMock = { };
  ImmutableMock.List = (initialState) => {
    ImmutableMock.mock = new MockImmutableList(initialState);
    return ImmutableMock.mock;
  };
  return ImmutableMock;
}
