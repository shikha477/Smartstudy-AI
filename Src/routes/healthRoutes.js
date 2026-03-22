import express from "express";
import { successResponse } from "../utils/apiResponse.js";

const router = express.Router();

router.get("/",(req,res)=>{
    successResponse(res,null,"smartstudyAPI is running");
});

export default router;
