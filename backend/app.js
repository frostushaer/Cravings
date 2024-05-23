import express from 'express';
import categoryRouter from './routes/category.js';
import restaurantRouter from './routes/restaurant.js';
import foodRouter from './routes/food.js';
import  ratingRouter from './routes/rating.js';
import { config } from 'dotenv';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import addressRouter from './routes/address.js';
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';


export const app = express();

config();

app.use(express.json());
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
);
app.use(express.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/food", foodRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/address", addressRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
    res.send("Nice working");
});

app.use(errorMiddleware);