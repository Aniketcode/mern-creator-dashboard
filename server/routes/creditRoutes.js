
import express from 'express';
const router = express.Router()
import { authProtect } from '../middleware/authentication.js';
import { getCredits,completeProfile,getProfileData } from '../controllers/credits-controller.js';

// api/credit/credits
router.get('/credits', authProtect, getCredits);

// api/credit/profile
router.post('/profile', authProtect, completeProfile);
  

// api/credit/profile-data
router.get('/profile-data', authProtect, getProfileData);

export default router;

