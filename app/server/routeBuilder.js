import * as routes from 'controllers/routes';

/**
 * Route building function, sets the route handlers for the specified path
 * @method buildRoutes
 * @param  {Express}    app - express server
 */
export function buildRoutes(app) {
  /* set routes */
  // api
  app.use('/api/v1', routes.api.v1);
  app.use('/api/*', routes.api.errorHandler);

  // front-end
  app.use('/', routes.frontEnd);
}
