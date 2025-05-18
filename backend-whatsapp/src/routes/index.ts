import { Router } from 'express';
import { sendMessage } from '../controllers/messageController';

const router = Router();

router.get('/', (req, res) => {
  res.send('API WhatsApp Language AI - Online!');
});

router.post('/message', sendMessage);

export default router;