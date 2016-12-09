/**
 * Mock front end express rout config
 */
import express from 'express';
import renderPage from 'controllers/frontend';
import { routes, routeReducerMapping, buildRootReducer } from 'test/core/mocks';

const frontEnd = express.Router();

frontEnd.get('/*', renderPage(routes, routeReducerMapping, buildRootReducer));

export default frontEnd;
