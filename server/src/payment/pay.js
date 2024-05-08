const checkout = async (req, res) => {
    const options = {

      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
  
    res.status(200).json({
      success: true,
      order,
    });
};
  
const paymentVerification = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const body = razorpay_order_id + "|" + razorpay_payment_id;
  
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
      .update(body.toString())
      .digest("hex");
  
    const isAuthentic = expectedSignature === razorpay_signature;
  
    if (isAuthentic) {

      await Payment.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      res.send({status: 200, data: {message: "Payment Successful"}})
    } else {
      res.send({status: 400, data: {message: "Not Authenticated"}});
    }
};

module.exports = {checkout, paymentVerification}