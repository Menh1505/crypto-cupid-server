import express from 'express';
import {
    createMatch,
    getMatchesForUser,
    deleteMatchById
} from '../controllers/MatchController';

const router = express.Router();

router.post('/', createMatch);
router.get('/user/:userId', getMatchesForUser);
router.delete('/:id', deleteMatchById);

export default router;