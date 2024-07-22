const express = require("express");
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow cookies to be sent with requests
}));


const sessionSecret = "3f6a025b9e6b8c081f22d49a609f3e5268e7b0e5f32f27d72d51ab3e75b8ec614265gyuutwerlmj0f2a6abf865c0bf6d29d240ce6b8edbbf7b1547d7a5c9923c30f6d45c5a4"
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: process.env.NODE_ENV === 'production' }
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// app.use(cors("*"));


app.get("/", (req, res) => {
    return res.status(200).send({ message: "welcome to ecommerce api - node" });
});

const journalRouter = require('./routes/journal.routes');
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const productRouter = require("./routes/product.routes.js");
const adminProductRouter = require("./routes/product.admin.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const cartItemRouter = require("./routes/cartItem.routes.js");
const orderRouter = require("./routes/order.routes.js");
const paymentRouter = require("./routes/payment.routes.js");
const reviewRouter = require("./routes/review.routes.js");
const ratingRouter = require("./routes/rating.routes.js");
const adminOrderRoutes = require("./routes/adminOrder.routes.js");

app.use('/api/journals', journalRouter);
app.use("/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/admin/products", adminProductRouter);
app.use("/api/cart", cartRouter);
app.use("/api/cart_items", cartItemRouter);
app.use("/api/orders", orderRouter);
app.use('/api/payments', paymentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/admin/orders", adminOrderRoutes);

module.exports = { app };
