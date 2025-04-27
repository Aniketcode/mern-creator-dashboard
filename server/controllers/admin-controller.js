import User from '../models/User.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select('username email credits recentActivities');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUserCredits = async (req, res, next) => {
  try {
    const { userId, credits } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }
    user.credits = credits;
    await user.save();
    res.json({ message: 'Credits updated' });
  } catch (err) {
    next(err);
  }
};

export const getUserActivities = async (req, res, next) => {
  try {
    const users = await User.find().select('username recentActivities');
    let activities = [];

    users?.forEach(user => {
      user?.recentActivities.forEach(activity => {
        activities.push({
          username: user?.username,
          type: activity?.type,
          timestamp: activity?.timestamp,
          postId: activity?.postId || null,
          source: activity?.source || null,
        });
      });
    });

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(activities);
  } catch (err) {
    next(err);
  }
};



