/**
 * Export API endpoint handlers for v1 of the api. Each function should handle a
 * defined HTTP method for each end point.
 *
 * e.g. A user.js module can define the following methods:
 *    getUser(opt, data); // handle GET request
 *    postUser(opt, data) // handle POST request
 *    deleteUser(opt, data) // handle DELTE request
 *
 * Ideally, each module should be composed of pure functions and should not
 * hold any state - mainly for testability.
 */
import * as todoList from 'controllers/api/v1/todos';

export default todoList;
