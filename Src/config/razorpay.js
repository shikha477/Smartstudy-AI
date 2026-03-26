// import Razorpay from "razorpay";

// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// export default razorpay;

import Razorpay from "razorpay";

let razorpay;

const getRazorpayInstance = () => {
  if (!razorpay) {
    console.log("KEY:", process.env.RAZORPAY_KEY_ID); 

    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpay;
};

export default getRazorpayInstance;