const express=require("express")
const axios = require('axios');
const cors=require('cors');
const emailService = require('../src/services/email.service.js');

const app=express();

app.use(express.json())
app.use(cors())

app.get('/api/address/:pincode',async (req, res) => {
    const { pincode} = req.params;
    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
        if (response.data[0].Status === 'Success') {
            res.json(response.data[0].PostOffice[0]);
        } else {
            res.status(404).json({ error: 'Invalid PIN code' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server error'});
    }
}
);

app.get("/",(req,res)=>{
    return res.status(200).send({message:"welcome to ecommerce api - node"})
})
// journal routes
const journalRouter = require('./routes/journal.routes');
app.use('/api/journals', journalRouter);

const authRouter=require("./routes/auth.routes.js")
app.use("/auth",authRouter)
const userRouter=require("./routes/user.routes.js");
app.use("/api/users",userRouter)

const productRouter=require("./routes/product.routes.js");
app.use("/api/products",productRouter);

const adminProductRouter=require("./routes/product.admin.routes.js");
app.use("/api/admin/products",adminProductRouter);

const cartRouter=require("./routes/cart.routes.js")
app.use("/api/cart", cartRouter);

const cartItemRouter=require("./routes/cartItem.routes.js")
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./routes/order.routes.js");
app.use("/api/orders",orderRouter);

const paymentRouter=require("./routes/payment.routes.js");
app.use('/api/payments',paymentRouter)

const reviewRouter=require("./routes/review.routes.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./routes/rating.routes.js");
app.use("/api/ratings",ratingRouter);

// admin routes handler
const adminOrderRoutes=require("./routes/adminOrder.routes.js");
app.use("/api/admin/orders",adminOrderRoutes);

//collection routes handler
const collectionRoutes=require("./routes/collection.routes.js");
app.use("/api/collections", collectionRoutes)

//address routes handler
const addressRoutes=require("./routes/address.routes.js");
app.use("/api/addresses", addressRoutes);

//coupon routes handler
const couponRouter = require("./routes/coupon.routes.js");
app.use("/api/coupons", couponRouter);

//wallet routes handler
const walletRouter = require("./routes/wallet.routes.js");
app.use("/api/wallet", walletRouter);

// (async function(){
//     const result = await emailService.sendAccountConfirmationEmail('ajayaxes318@gmail.com');
//     console.log(result);
// })();


module.exports={app};