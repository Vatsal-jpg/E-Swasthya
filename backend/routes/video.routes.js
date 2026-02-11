import express from 'express';
import {
  getVideoToken,
  validateRoom
} from '../controllers/video.controller.js';

const router = express.Router();

// Apply authentication middleware if needed
// router.use(authMiddleware.verifyToken);

router.post('/token', getVideoToken);
router.get('/validate/:room', validateRoom);

export default router;