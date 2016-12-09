import todoList from 'controllers/api/v1';

/**
 * Map each request path to an associated reducer.
 *
 * Object should be in the form:
 * {
 *  '/path': {
 *      handler: <fetch_data>, // return promise
 *      buildInitialState: <map_data_to_reducer_name> // return {name: data}
 *    }
 * }
 */
export default {
  '/todos': {
    /*
      Handler gets called to fetch data from a backend. In this case the handler
      is an already defined method used to serve the API, however a handler can
      also be a collection of other methods which combine data from multiple
      sources.
     */
    handler: todoList.getTodos,
    /*
      ensure that the reducer for this path is returned as an object in the
      format:
          {reducerName: reducerData}
    */
    buildInitialState: data => ({
      todoReducer: data.data,
    }),
  },
};
