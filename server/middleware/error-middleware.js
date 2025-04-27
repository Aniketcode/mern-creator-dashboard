// middleware/error-middleware.js

const errorMiddleware = (err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Backend Error';
   const stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;
   
   res.status(statusCode).json({
     success: false,
     message,
     stack,
   });
 };


export default errorMiddleware;