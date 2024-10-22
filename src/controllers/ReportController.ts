import { Request, Response } from 'express';
import Report from '../models/Report';

// Create a new report
export const createReport = async (req: Request, res: Response) => {
    try {
        const { reporterId, reportedUserId, reason } = req.body;
        const report = new Report({ reporterId, reportedUserId, reason });
        await report.save();
        res.status(201).json(report);
    } catch (error) {   
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get reports by reporter ID
export const getReportsByReporterId = async (req: Request, res: Response) => {
    try {
        const reports = await Report.find({ reporterId: req.params.reporterId });
        res.json(reports);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get reports by reported user ID
export const getReportsByReportedUserId = async (req: Request, res: Response) => {
    try {
        const reports = await Report.find({ reportedUserId: req.params.reportedUserId });
        res.json(reports);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a report by ID
export const deleteReportById = async (req: Request, res: Response) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
