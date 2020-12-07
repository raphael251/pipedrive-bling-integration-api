import { Router } from 'express';
import { PipedriveRouter } from './PipedriveRouter';
import { OrdersRouter } from './OrdersRouter';

const router = Router();
router.get('/', (req, res) => res.send({ isAPIWorking: true }));

router.use(PipedriveRouter);
router.use(OrdersRouter);

export default router;
