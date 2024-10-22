import express from 'express';
import {
    createBlock,
    getBlocksForUser,
    deleteBlockById
} from '../controllers/BlockController';

const router = express.Router();

router.post('/', createBlock);
router.get('/user/:userId', getBlocksForUser);
router.delete('/:id', deleteBlockById);

export default router;