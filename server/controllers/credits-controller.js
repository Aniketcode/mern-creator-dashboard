import User from '../models/User.js';

export const getCredits = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    res.json({ credits: user.credits });
  } catch (err) {
    next(err);
  }
};

export const completeProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    if (!user.profileCompleted) {
      user.profileCompleted = true;
      user.credits += 10;
      await user.save();
    }

    res.json({ message: 'Profile completed', credits: user.credits });
  } catch (err) {
    next(err);
  }
};

export const getProfileData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.json({
      savedPosts: user.savedPosts || [],
      recentActivities: user.recentActivities || [],
    });
  } catch (err) {
    next(err);
  }
};
