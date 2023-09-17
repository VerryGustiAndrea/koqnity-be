import express from 'express';
const router = express.Router();
import makeExpressCallback from '../../express-callback/app';

// ###
import route from './routes';
import middleware from '../../middlewares/app';
// ###
const routes = route(router, makeExpressCallback, middleware.validateAuth, middleware.validateAdmin);
// ###

export = routes;
