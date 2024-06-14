import express from 'express';
import { authenticateUser, createUser } from '../controllers/userController.js';
// import { createUser } from '../controllers/userController';

const router = express.Router()
router.post('/signup',  createUser());
router.post('/login',authenticateUser());

// export default router;
export default router;
