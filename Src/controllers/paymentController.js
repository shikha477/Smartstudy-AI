import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import { successResponse } from "../utils/apiResponse.js";
import getRazorpayInstance from "../config/razorpay.js";

//  CREATE ORDER
export const createOrder = async (req, res, next) => {
  try {

    const razorpay = getRazorpayInstance();
    const amount = 50000; // ₹500 (Razorpay uses paise)

    const options = {
      amount: amount,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    successResponse(res, order, "Order created successfully");
  } catch (error) {
    next(error);
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    //  verification fail
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed"
      });
    }

    // success
    const user = req.user;

    user.plan = "pro";
    user.usageCount = 0;
    await user.save();

    await Subscription.create({
      userId: user._id,
      plan: "pro",
      paymentId: razorpay_payment_id,
      status: "paid",
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    successResponse(res, null, "Payment verified & Pro activated 🚀");

  } catch (error) {
    next(error);
  }
};

// import razorpay from "../config/razorpay.js";
// import crypto from "crypto";
// import Subscription from "../models/Subscription";
// import User from "../models/User.js";
// import {successResponse} from "../utils/apiResponse.js";


// //create order
// export const createOrder = async (req,res, next)=>{
//     try{
//         const amount =50000;
//         const options={
//             amount:amount,
//             currency:"INR",
//             receipt:"receipt_"+Date.now()
//         };
//         const order = await razorpay.orders.create(options);

//         successResponse(res, order, "order ceated");

//     }catch (error){
//         next(error);
//     }
// };
// // verify payment
// export const verifyPayment = async (req,res, next)=>{
//     try{
//         const {razorpay_oredr_id , razorpay_payment_id, razorpay_signature} = req.body;

//         const body = razorpay_oredr_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(body.toString())
//         .digest("hex");

//         if ( expectedSignature !== razorpay_signature){
//             return res.status(400).json({
//                 success:false,
//                 message:"payment verification failed"
//             });
//         }

//         const user = req.user;

//         user.plan = "pro";
//         user.usageCount = 0;
//         await user.save();

//         await Subscription.create({
//             userId: user._id,
//             plan:"pro",
//             paymentId: razorpay_payment_id,
//             status:"paid",
//             expiryDate: new Date(Date.now() + 30*24*60*60*1000)
//         });
//         successResponse(res, null, "payment verified and subscription activated");
//     } catch (error){
//         next (error);
//     }
// };