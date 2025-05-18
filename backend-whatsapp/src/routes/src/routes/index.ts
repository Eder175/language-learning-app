import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('API WhatsApp Language AI - Online!');
});

export default router;