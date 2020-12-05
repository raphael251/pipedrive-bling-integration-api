import { Router } from 'express';
import { PipedriveRouter } from './PipedriveRouter';

const router = Router();
router.get('/', (req, res) => res.send({ isApiWorking: true }));

router.use(PipedriveRouter);

export default router;
