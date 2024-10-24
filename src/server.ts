import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import './config/passport-setup'; // Ensure this is imported to configure passport
import userRoutes from './routes/UserRoutes';
import swipeRoutes from './routes/SwipeRoutes';
import matchRoutes from './routes/MatchRoutes';
import messageRoutes from './routes/MessageRoutes';
import blockRoutes from './routes/BlockRoutes';
import reportRoutes from './routes/ReportRoutes';
import authRoutes from './routes/AuthRoutes'; // Import the auth routes
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import { handleSocketConnection } from './controllers/MessageController';

require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/dating-app');
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your client URL
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
// Session management
app.use(session({
    secret: process.env.SESSION_SECRET as string || 'default_secret_key',
    resave: false,
    saveUninitialized: true,
}));

handleSocketConnection(io);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', userRoutes);
app.use('/swipes', swipeRoutes);
app.use('/matches', matchRoutes);
app.use('/messages', messageRoutes);
app.use('/blocks', blockRoutes);
app.use('/reports', reportRoutes);
app.use('/auth', authRoutes); // Use the auth routes

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
