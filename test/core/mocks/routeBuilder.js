import v1 from 'test/core/mocks/routes/v1';
import frontEnd from 'test/core/mocks/routes/frontEnd';

export function buildRoutes(app) {
  app.use('/api/v1', v1);
  app.use('/', frontEnd);
}
