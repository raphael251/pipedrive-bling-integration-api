import { Router } from 'express';
import { OrdersController } from '../../controllers/OrdersController';
import { IHttpRequest } from '../../../../shared/interfaces/http';
import { OrderRepository } from '../../../../infra/database/mongodb/repositories/OrderRepository';

const router = Router();

router.get('/orders', async (req, res) => {
  const request: IHttpRequest = {
    body: req.body,
    headers: req.headers,
    params: req.params,
  };
  const orderRepository = new OrderRepository();
  const response = await new OrdersController(orderRepository).handle(request);
  res.status(response.status).send(response.body);
});

router.get('/orders/:orderId', async (req, res) => {
  const request: IHttpRequest = {
    body: req.body,
    headers: req.headers,
    params: req.params,
  };
  const orderRepository = new OrderRepository();
  const response = await new OrdersController(orderRepository).handle(request);
  res.status(response.status).send(response.body);
});

export { router as OrdersRouter };
