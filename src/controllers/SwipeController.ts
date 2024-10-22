import { Request, Response } from 'express';
import Swipe from '../models/Swipe';

// Create a new swipe
export const createSwipe = async (req: Request, res: Response) => {
    try {
        const { swiper_id, swipee_id, direction } = req.body;
        const swipe = new Swipe({ swiper_id, swipee_id, direction });
        await swipe.save();
        res.status(201).json(swipe);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get swipes by swiper ID
export const getSwipesBySwiperId = async (req: Request, res: Response) => {
    try {
        const swipes = await Swipe.find({ swiper_id: req.params.swiperId });
        res.json(swipes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get swipes by swipee ID
export const getSwipesBySwipeeId = async (req: Request, res: Response) => {
    try {
        const swipes = await Swipe.find({ swipee_id: req.params.swipeeId });
        res.json(swipes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a swipe by ID
export const deleteSwipeById = async (req: Request, res: Response) => {
    try {
        const swipe = await Swipe.findByIdAndDelete(req.params.id);
        if (!swipe) {
            return res.status(404).json({ error: 'Swipe not found' });
        }
        res.json({ message: 'Swipe deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};