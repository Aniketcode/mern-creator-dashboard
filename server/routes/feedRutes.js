
import express from 'express';
import { authProtect } from '../middleware/authentication.js';
import {
  getAggregatedFeed,
  getFeedActivities,
  savePost,
  reportPost,
} from '../controllers/feed-controller.js';

const router = express.Router();

// @api/feed/aggregate
router.get('/aggregate', getAggregatedFeed);

// @api/feed/save
router.post('/save', authProtect, savePost);

// @api/feed/report
router.post('/report', authProtect, reportPost);

// @api/feed/feed-activities
router.get('/feed-activities', authProtect, getFeedActivities);

export default router;
