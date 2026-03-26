import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,

    role: {
        type: String,
        default :"user"
    },

    plan :{
        type: String,
        enum: ["free","pro"],
        default: "free"
    },

    usageCount:{
        type:Number,
        default :0
    },
    xp:{
        type:Number,
        default:0
    },
    streak:{
        type:Number,
        default:0
    },
    lastActiveDate:{
        type:Date,
    },
    badges:{
        type:[String],
        default:[]
    }

}, { timestamps : true});

const User = mongoose.model("User", userSchema);
export default User;