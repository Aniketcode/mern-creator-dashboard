import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import connectDB from './db/db.js';
const PORT = process.env.PORT || 8000
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middleware/error-middleware.js';
import userRoute from './routes/userRoutes.js';
import feedRoute from './routes/feedRutes.js';
import creditRoute from './routes/creditRoutes.js';
import adminRoute from './routes/adminRoutes.js';

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = [
    'https://mern-creator-dashboard-bhol.vercel.app',
    'http://localhost:5173'
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Routes
app.use('/api/user', userRoute);
app.use('/api/feed', feedRoute);
app.use('/api/credit', creditRoute);
app.use('/api/admin', adminRoute);



// /app.get('/', (req, res) => {
//     res.send('hello mern creator..')
// })

app.get('/home', (req, res) => {
    res.send('You are in home ..')
})

// Global error 
app.use(errorMiddleware);


// Connection to db & starting port
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server started at: http://localhost:${PORT}`)
    });
});



