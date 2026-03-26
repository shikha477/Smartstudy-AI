import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import noteRoutes from './routes/noteRoutes.js';

import healthRoutes from './routes/healthRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';

import chatRoutes from './routes/chatRoutes.js';

import userRoutes from './routes/userRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();
//security headers
app.use(helmet());
//middleware
app.use(cors());

app.use(express.json());

//logger
app.use(morgan("dev"));

//rete limit 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);

app.use("/api/health",healthRoutes);

app.use("/api/notes", noteRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments",paymentRoutes);
app.use(errorHandler);

// app.get('/health',(req,res) =>{
//     res.status(200).json({
//         status:'ok',
//         message:"Smartstudy Ai API is running"
//     });
// });
export default app;