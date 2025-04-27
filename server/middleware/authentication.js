import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authProtect = async (req, res, next) => {
  const token = req.cookies.jwttoken;

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    req.user.role = decoded.role; 

    next();
  } catch (error) {
    console.error('Token error:', error);
    res.status(401).json({ message: 'Token Invalid!' });
  }
};

export const adminProtect = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied, Admins only' });
  }
};
