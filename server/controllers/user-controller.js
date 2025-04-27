import User from '../models/User.js';
import { hashedPassword } from '../helper/auth.js';
import generateToken from '../helper/generateToken.js';

export const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    const error = new Error('Please fill all fields.');
    error.statusCode = 400;
    return next(error);
  }

  try {
    const hashedPass = await hashedPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPass,
      role: role || 'user',
    });

    if (!user) {
      const error = new Error('Invalid credentials');
      error.statusCode = 400;
      return next(error);
    }

    generateToken(res, user);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      credits: user.credits,
      profileCompleted: user.profileCompleted,
      savedPosts: user.savedPosts,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateToken(res, user);

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        credits: user.credits,
        profileCompleted: user.profileCompleted,
        savedPosts: user.savedPosts,
      });
    } else {
      const error = new Error('Invalid credentials');
      error.statusCode = 400;
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      credits: user.credits,
      profileCompleted: user.profileCompleted,
      savedPosts: user.savedPosts,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    if (req.body.username) {
      user.username = req.body.username;
    }
    if (typeof req.body.profileCompleted !== 'undefined') {
      user.profileCompleted = req.body.profileCompleted;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      credits: updatedUser.credits,
      profileCompleted: updatedUser.profileCompleted,
      savedPosts: updatedUser.savedPosts,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.cookie('jwttoken', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out successfully' });
};
