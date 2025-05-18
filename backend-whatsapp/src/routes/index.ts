import { Router } from 'express';
import { sendMessage } from '../controllers/messageController';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API WhatsApp Language AI - Online!',
    timestamp: new Date().toISOString()
  });
});

router.post('/message', sendMessage);

export default router;