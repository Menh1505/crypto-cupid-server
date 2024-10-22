import { Request, Response } from 'express';
import Block from '../models/Block';

// Create a new block
export const createBlock = async (req: Request, res: Response) => {
    try {
        const { blockerId, blockedUserId } = req.body;
        const block = new Block({ blockerId, blockedUserId });
        await block.save();
        res.status(201).json(block);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get blocks for a specific user
export const getBlocksForUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const blocks = await Block.find({ blockerId: userId });
        res.json(blocks);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a block by ID
export const deleteBlockById = async (req: Request, res: Response) => {
    try {
        const block = await Block.findByIdAndDelete(req.params.id);
        if (!block) {
            return res.status(404).json({ error: 'Block not found' });
        }
        res.json({ message: 'Block deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};
