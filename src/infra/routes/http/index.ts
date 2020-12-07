import { Router } from 'express';
import { PipedriveRouter } from '../../../modules/pipedrive/routes/http/PipedriveRouter';
import { OrdersRouter } from '../../../modules/orders/routes/http/OrdersRouter';

const router = Router();
router.get('/', (req, res) => res.send({ isAPIWorking: true }));

router.use(PipedriveRouter);
router.use(OrdersRouter);

export default router;
