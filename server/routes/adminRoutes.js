
import express from 'express';
import { authProtect,adminProtect } from '../middleware/authentication.js';
import { getAllUsers,getUserActivities,updateUserCredits } from '../controllers/admin-controller.js';
const router = express.Router();


// api/admin/users
router.get('/users', authProtect, adminProtect, getAllUsers);

// api/admin/update-credits
router.post('/update-credits', authProtect, adminProtect, updateUserCredits);


// api/admin/activities
router.get('/activities', authProtect, adminProtect, getUserActivities);


export default router;
