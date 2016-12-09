/**
 * Handles api calls and allows api handling functions to have a consistent
 * method signature. Ensures that each api handler accepts specific request
 * options and data and returns a promise
 */

import _ from 'lodash';

/**
 * Wrap each api request and strip relevant data from the request object and
 * pass it down to the api logic function. Each api logic function should return
 * a promise resolving a simple object (JSON is sent back to the client)
 *
 * @method routeWrapper
 * @param  {function}        apiMethod - handles the api request. Each api
 *                                       endpoint should have a handler function
 * @return {Promise}
 */
export function routeWrapper(apiMethod) {
  /**
   * Function to handle the express route
   *
   * @method
   * @param  {object}     req - express request object
   * @param  {object}     res - express response object
   * @param  {Function}  next - next middleware in line
   *
   * @return {Promise}
   */
  return (req, res, next) => {
    const data = req ? req.body : '';
    const options = req ? _.extend({ }, req.query, req.params) : {};

    return apiMethod(options, data)
      .then(response => (typeof response === 'object' ?
        response :
        JSON.parse(response)))
      .then(json => res.json(json || { }))
      .catch((err) => {
        res.status(err.statusCode || 500);
        res.json(err.message);
      });
  };
}
