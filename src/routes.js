import Router from 'express';
import TransacoesController from './app/controllers/TransacoesController';

const routes = new Router();

routes.post('/v1/payments', TransacoesController.create);

routes.get('/v1/payments', TransacoesController.search);

export default routes;