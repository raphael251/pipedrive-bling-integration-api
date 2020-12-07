import { Router } from 'express';
import { PipedriveController } from '../../controllers/PipedriveController';
import { OrderRepository } from '../../infra/database/mongodb/repositories/OrderRepository';
import { IHttpRequest } from '../../interfaces/http';
import { PipedriveBasicAuthMiddleware } from '../../middlewares/PipedriveBasicAuthMiddleware';

const router = Router();

router.post(
  '/pipedrive',
  (req, res, next) => PipedriveBasicAuthMiddleware.handle(req, res, next),
  async (req, res) => {
    const request: IHttpRequest = {
      body: req.body,
      headers: req.headers,
      params: req.params,
    };
    const orderRepository = new OrderRepository();
    const response = await new PipedriveController(orderRepository).handle(
      request
    );
    res.status(response.status).send(response.body);
  }
);

export { router as PipedriveRouter };
