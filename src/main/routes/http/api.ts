import { Router } from 'express';

const router = Router();
router.post('/', (req, res) => {
  console.log(JSON.stringify(req.body));
  res.status(200).send();
});
router.get('/', (req, res) => res.send({ isApiWorking: true }));

export default router;
