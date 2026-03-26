import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    plan:{
        type: String,
        enum:["free","pro"]
    },
    paymentId:String,

    status:{
        type: String,
        enum:["created","paid","failed"],
        default:"created"
    },
    expiryDate:Date
},{timestamps: true});

const Subscription  = mongoose.model("Subscription",subscriptionSchema);

export default Subscription;