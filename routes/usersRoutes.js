import express from 'express';
import {getUsersById,getAllUsers,editEntryById,createEntry} from '../controllers/users.js';

const usersRoutes = express.Router();

usersRoutes.get('/all', getAllUsers);
usersRoutes.get('/userById/:id', getUsersById);
usersRoutes.post('/createUser', createEntry);
usersRoutes.patch('/editById/:id',editEntryById);

export default usersRoutes; 