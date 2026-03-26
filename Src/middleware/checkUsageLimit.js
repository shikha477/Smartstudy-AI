import User from '../models/User.js';


const checkUsageLimit = async (req,res,next) =>{
    try{
        const userId = req.headers["user-id"];
        if(!userId){
            return res.status(401).json({
                success:false,
                message: "User ID required"
            });
        }
        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({
                success:false,
                message: "User not found"
            });
        }
        //free plan limit
        if (user.plan === "free" && user.usageCount >= 30){
            return res.status(403).json({
                success:false,
                message: "Free limit reached. Upgrade to Pro."
            });
        }
        //increment usage
        user.usageCount += 1;
        await user.save();
    
        req.user = user; // attach user to request for later use
        next();
    } catch (error){
        next(error);
    }

};
export default checkUsageLimit;