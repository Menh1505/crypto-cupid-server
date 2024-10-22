import express from 'express';
import {
    createMessage,
    getMessagesByMatchId,
    deleteMessageById
} from '../controllers/MessageController';

const router = express.Router();

router.post('/', createMessage);
router.get('/match/:matchId', getMessagesByMatchId);
router.delete('/:id', deleteMessageById);

export default router;