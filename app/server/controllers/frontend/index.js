/**
 * HTML page rendering handler
 */
import chalk from 'chalk';
import { render, storeResolver } from 'controllers/lib';
import { ERROR_TYPES } from 'controllers/lib/routeMatcher';

/**
 * Create the render page page route handler function based on the routes passed
 * @method renderPage
 * @param  {object}   routes - routes object (react router) as a simple object
 *                             and not JSX
 * @return {function}        - HTML page hander function passed to express
 */

export default function renderPage(
  routes,
  routeReducerMapping,
  buildRootReducer
) {
  /**
   * Match the requested route and render the page matching it
   *
   * @method renderPage
   * @param  {object}       req - express request object
   * @param  {object}       res - express response object
   */
  return (req, res) => render(routes, req.path,
    storeResolver(req, routeReducerMapping, buildRootReducer))
    .then((resp) => {
      if (resp.redirect) {
        res.redirect(302, resp.redirect.pathname + resp.redirect.search);
      } else {
        /*
          resp.html - the pre-rendered HTML code (react-to-HTML) and is
          inserted into the main HTML page.
          resp.store - the redux app state which is injected into the template
        */
        res.render('index',
          {
            body: resp.html,
            initialState: resp.store
          });
      }
    })
    .catch((err) => {
      let code = 500;
      let message = 'Server error';

      if (err.type === ERROR_TYPES.NO_RENDER_PROPS) {
        code = 404;
        message = 'Path not found';
      } else {
        console.error(
          chalk.bold.red('An error occurred rendering the main page')
        );
        console.error(err);
      }

      res.status(code);
      res.render('error', {
        code,
        message,
      });
    });
}
