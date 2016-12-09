import _ from 'lodash';

/**
 * Remove appropriate request data from the request in order to fetch data from
 * a data source. The data source can be either an API endpoint, a API endpoint
 * handler method or some other source.
 *
 * The apiMethod should return a promise which resolves a JSON string containing
 * the required data for the requested URL
 *
 * @method
 * @param  {Promise}      apiMethod -  used to fetch data from either a
 *                                     networked resource, a database or other
 *                                     source
 * @param  {object}              req - express request object
 * @return {Promise}                 - API handler should return a promise
 */
export default function storeWrapper(apiMethod, req) {
  const data = req ? req.body : '';
  const options = req ? _.extend({ }, req.query, req.params) : {};

  return apiMethod(options, data);
}
