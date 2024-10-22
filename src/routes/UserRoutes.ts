import express from 'express';
import {
    createUser,
    updateUserById,
    deleteUserById,
    listUsers,
    getUserById
} from '../controllers/UserController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = express.Router();

// Route to create a new user
router.post('/', createUser);

// Route to get a user by ID
router.get('/:id', getUserById);

// Route to update a user by ID
router.put('/:id', updateUserById);

// Route to delete a user by ID
router.delete('/:id', deleteUserById);

// Route to list all users
router.get('/', listUsers);

export default router;