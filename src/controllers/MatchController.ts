import { Request, Response } from 'express';
import Match from '../models/Match';

// Create a new match
export const createMatch = async (req: Request, res: Response) => {
    try {
        const { user1_id, user2_id, is_mutual } = req.body;

        // Check if a match already exists between the two users
        const existingMatch = await Match.findOne({
            $or: [
                { user1_id, user2_id },
                { user1_id: user2_id, user2_id: user1_id }
            ]
        });

        if (existingMatch) {
            return res.status(400).json({ error: 'Match already exists between these users' });
        }

        const match = new Match({ user1_id, user2_id, is_mutual });
        await match.save();
        res.status(201).json(match);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get matches for a specific user
export const getMatchesForUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const matches = await Match.find({
            $or: [
                { user1_id: userId },
                { user2_id: userId }
            ]
        }).populate('user1_id user2_id');
        res.json(matches);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a match by ID
export const deleteMatchById = async (req: Request, res: Response) => {
    try {
        const match = await Match.findByIdAndDelete(req.params.id);
        if (!match) {
            return res.status(404).json({ error: 'Match not found' });
        }
        res.json({ message: 'Match deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
