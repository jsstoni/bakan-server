import isAuthorized from '@/middleware/auth/authorized';
import { Router } from 'express';

const router = Router();

router.get('/admin', isAuthorized, (_, res) => {
  res.send('admin');
});

export default router;
