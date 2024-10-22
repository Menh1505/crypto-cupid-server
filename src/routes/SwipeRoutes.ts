import express from 'express';
import {
    createSwipe,
    getSwipesBySwiperId,
    getSwipesBySwipeeId,
    deleteSwipeById
} from '../controllers/SwipeController';

const router = express.Router();

router.post('/', createSwipe);
router.get('/swiper/:swiperId', getSwipesBySwiperId);
router.get('/swipee/:swipeeId', getSwipesBySwipeeId);
router.delete('/:id', deleteSwipeById);

export default router;