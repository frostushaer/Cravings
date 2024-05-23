import { Order } from "../models/order.js";

export const placeOrder = async (req, res, next) => {
    try {
        const newOrder = new Order({ ...req.body, userId: req.user.id });

        await newOrder.save();
        const orderId = newOrder._id;

        res.status(201).json({ status: "success", message: "Order placed successfully", orderId: orderId});
    } catch (error) {
        next(error);
    }
};

export const getOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { paymentStatus, orderStatus } = req.query;

        let query = { userId };

        if(paymentStatus) {
            query.paymentStatus = paymentStatus;
        }
        if(orderStatus) {
            query.orderStatus = orderStatus;
        }

        const orders = await Order.find(query).populate({
            path: "orderItems.foodId",
            select: "imageUrl title rating time"
        })

        res.status(200).json({ status: "success", orders: orders });
    } catch (error) {
        next(error);
    }
};