import express from 'express';
import {
    createReport,
    getReportsByReporterId,
    getReportsByReportedUserId,
    deleteReportById
} from '../controllers/ReportController';

const router = express.Router();

router.post('/', createReport);
router.get('/reporter/:reporterId', getReportsByReporterId);
router.get('/reported/:reportedUserId', getReportsByReportedUserId);
router.delete('/:id', deleteReportById);

export default router;