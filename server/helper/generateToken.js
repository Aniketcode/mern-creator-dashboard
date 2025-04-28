import jwt from 'jsonwebtoken';
const generateToken = (res,user) =>{
    const token = jwt.sign(
        {
          userId: user._id,
          role: user.role, 
        },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

    res.cookie('jwttoken', token,  {
        httpOnly : true,
        secure: true,
        sameSite : 'none',
        maxAge : 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken;