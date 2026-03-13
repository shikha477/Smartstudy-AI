import express from 'express';
import cors from 'cors';

const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.get('/health',(req,res) =>{
    res.status(200).json({
        status:'ok',
        message:"Smartstudy Ai API is running"
    });
});
export default app;