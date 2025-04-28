import axios from 'axios';
import User from '../models/User.js';

export const getAggregatedFeed = async (req, res, next) => {
  try {
    const auth = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString('base64');

    const tokenResponse = await axios.post(
      'https://www.reddit.com/api/v1/access_token',
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'MernCreatorApp/1.0'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const reddit = await axios.get(process.env.REDDIT_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'MernCreatorApp/1.0'
      }
    });

    const devto = await axios.get(process.env.DEVTO_URL);
    const redditPosts = reddit.data.data.children.map(c => ({
      id: c.data.id,
      title: c.data.title,
      url: `https://reddit.com${c.data.permalink}`,
      source: 'reddit',
      cover_image: c.data.thumbnail && c.data.thumbnail.startsWith('http') ? c.data.thumbnail : null,
    }));

    const devtoPosts = devto.data.slice(0, 20).map(post => ({
      id: post.id,
      title: post.title,
      url: post.url,
      description: post.description,
      source: 'devto',
      cover_image: post.cover_image,
    }));

    // 5. Send combined response
    res.json({
      reddit: redditPosts,
      devto: devtoPosts,
    });

  } catch (err) {
    next(err);
  }
};


export const savePost = async (req, res, next) => {
  try {
    const { postId, source } = req.body;
    const user = await User.findById(req.user);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    user.savedPosts.push({ postId, source });
    user.credits += 2;
    await user.save();

    res.json({ message: 'Post saved' });
  } catch (err) {
    next(err);
  }
};

export const reportPost = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    user.recentActivities.push({
      type: 'report',
      timestamp: new Date(),
    });

    if (user.recentActivities.length > 10) {
      user.recentActivities = user.recentActivities.slice(-10); // Keep only latest 10
    }

    await user.save();

    res.json({ message: 'Post reported and activity saved.' });
  } catch (err) {
    next(err);
  }
};

export const getFeedActivities = async (req, res, next) => {
  try {
    const user = await User.findById(req.user).select('recentActivities');

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json(user.recentActivities);
  } catch (err) {
    next(err);
  }
};
