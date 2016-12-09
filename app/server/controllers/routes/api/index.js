/**
 * Export versioned api route handlers.
 * Each handler should define which HTTP method express handles for a specific
 * route and set the handler method for that route.
 *
 * e.g. each versioned api should define:
 *         router.get('/user', routeWrapper(api.user.getUser));
 *      for each route and method it handles.
 */
import v1 from 'controllers/routes/api/v1';
import { errorHandler } from 'controllers/routes/api/errorHandler';

export { v1, errorHandler };
