/**
 * Specify the route handling for webpages pages
 *
 * renderPage handles route matching with react-router to return the
 * appropriate page.
 */
import express from 'express';
import renderPage from 'controllers/frontend';
import { routes } from 'shared';
// eslint-disable-next-line max-len
import routeReducerMapping from 'controllers/routes/frontend/routeReducerMapping';
import buildRootReducer from 'client/buildRootReducer';

const router = express.Router();

router.get('/*', renderPage(routes, routeReducerMapping, buildRootReducer));

export { router as frontEnd };
