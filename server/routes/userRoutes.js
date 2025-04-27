
import express from 'express';
import { signup, login, getProfile, updateProfile, logout } from '../controllers/user-controller.js';
import { authProtect } from '../middleware/authentication.js';
const router = express.Router()


// @ /api/user/register 
router.post('/register', signup);


// @ /api/user/login 
router.post('/login', login);


// @ /api/user/profile 
router.get('/profile', authProtect, getProfile)


// @ /api/user/profile/123 
router.put('/profile', authProtect, updateProfile)

// @ /api/user/logout 
router.post('/logout', logout);

export default router;
