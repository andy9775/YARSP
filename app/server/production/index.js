/**
 * Production environment server configuration
 */

import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import expressHandlebars from 'express-handlebars';

const app = new express();

// configure third party middleware
app.use(helmet());
app.use(compression());

// setup handlebars middleware
app.engine('handlebars', expressHandlebars({
  layoutDir: 'public/dist', // use the generated index.html file
  extname: 'handlebars',
}));
app.set('view engine', 'handlebars');
app.set('views', 'public/dist'); // use the generated index.html file
app.enable('view cache');

export default app;
