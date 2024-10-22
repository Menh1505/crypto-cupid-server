import { Request, Response } from 'express';
import Message from '../models/Message';
import { Server, Socket } from 'socket.io';

// Create a new message
export const createMessage = async (req: Request, res: Response) => {
    try {
        const { match_id, sender_id, receiver_id, content } = req.body;
        const message = new Message({ match_id, sender_id, receiver_id, content });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Get messages by match ID
export const getMessagesByMatchId = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find({ match_id: req.params.matchId }).sort({ created_at: 1 });
        res.json(messages);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Delete a message by ID
export const deleteMessageById = async (req: Request, res: Response) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

// Function to handle socket events
export const handleSocketConnection = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected');

        socket.on('joinRoom', (matchId) => {
            socket.join(matchId);
        });

        socket.on('sendMessage', async (messageData) => {
            try {
                const message = new Message(messageData);
                await message.save();
                io.to(messageData.match_id).emit('receiveMessage', message);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
