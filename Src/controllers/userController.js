import User from "../models/User.js";
import {successResponse} from "../utils/apiResponse.js";

export const getLeaderboard = async (req, res, next)=>{
    try{
        const users = await User.find()
            .sort({xp: -1})
            .limit(10)
            .select("name xp badges streak");

        successResponse(res, users, "Leaderboard fetched successfully");

    } catch (error){
        next(error);
    }
}