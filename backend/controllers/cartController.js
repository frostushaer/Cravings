import { Cart } from "../models/cart.js";

export const addProductToCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { productId, additives, totalPrice, quantity } = req.body;

        let count;

        const existingProduct = await Cart.findOne({ userId: userId, productId: productId });
        count = await Cart.countDocuments({ userId: userId });
        console.log(count);

        if(existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.totalPrice += totalPrice * quantity;
            await existingProduct.save();
            return res.status(200).json({ status: true, count: count });
        } else {
            const newCartItem = new Cart({
                userId: userId,
                productId: productId,
                additives: additives,
                totalPrice: totalPrice,
                quantity: quantity,
            });
            await newCartItem.save();
            count = await Cart.countDocuments({ userId: userId });
            res.status(201).json({ status: true, count: count });
        }
    } catch (error) {
        next(error);
    }
};

export const removeCartItem = async (req, res, next) => {
    try {
        const cartItemId = req.params.id;
        const userId = req.user.id;

        await Cart.findByIdAndDelete({ _id: cartItemId });
        const count = await Cart.countDocuments({ userId: userId });

        res.status(200).json({ status: true, count: count });
    } catch (error) {
        next(error);
    }
};

export const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.find({ userId: userId })
        .populate({
            path: "productId",
            select: "imageUrl title restaurant rating ratingCount",
            populate: {
                path: "restaurant",
                select: "time coords",
            },
        });

        res.status(200).json({ status: true, cart: cart });
    } catch (error) {
        next(error);
    }
};

export const getCartCount = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const count = await Cart.countDocuments({ userId: userId });

        res.status(200).json({ status: true, count: count });
    } catch (error) {
        next(error);
    }
};

export const decrementProductQuantity = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = req.params.id;

        const cartItem = await Cart.findById(id);
        if(cartItem){
            const productPrice = cartItem.totalPrice / cartItem.quantity;

            if(cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                cartItem.totalPrice -= productPrice;
                await cartItem.save();
                res.status(200).json({ status: true, message: "Quantity decremented successfully" });
            } else {
                await Cart.findOneAndDelete({ _id: id });
                res.status(200).json({ status: true, message: "Item removed from cart" });
            }
        }  else {
            res.status(400).json({ status: false, message: "Item not found" });
        }
    } catch (error) {
        next(error);
    }
};