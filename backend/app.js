import express from 'express';
import categoryRouter from './routes/category.js';
import restaurantRouter from './routes/restaurant.js';
import foodRouter from './routes/food.js';
import { config } from 'dotenv';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';

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

app.use("/api/categories", categoryRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/food", foodRouter);

app.get("/", (req, res) => {
    res.send("Nice working");
});

app.use(errorMiddleware);