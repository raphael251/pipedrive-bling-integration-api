import { Router } from 'express';
import { PipedriveController } from '../../controllers/PipedriveController';
import { IHttpRequest } from '../../interfaces';
import { PipedriveBasicAuthMiddleware } from '../../middlewares/PipedriveBasicAuthMiddleware';

const router = Router();
router.get('/', (req, res) => res.send({ isApiWorking: true }));

router.use('/pipedrive', PipedriveBasicAuthMiddleware.handle, async (req, res) => {
  const request: IHttpRequest = {
    body: req.body,
    headers: req.headers,
    params: req.params,
  };
  const response = await new PipedriveController().handle(request);
  res.status(response.status).send(response.body);
});

export default router;
