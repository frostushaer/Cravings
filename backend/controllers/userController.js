import { User } from "../models/user.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        const { password, __v, createdAt, ...userData } = user._doc;

        res.status(200).json({
            success: true,
            data: userData,
        });
    } catch (error) {
        next(error);
    }
};

export const verifyAccount = async (req, res, next) => {
    try {
        const userOtp = req.params.otp;
        const user = await User.findById(req.user.id);  
        if(!user) {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        if(user.verification === true) {
            res.status(200).json({
                success: true,
                message: "Account already verified",
            });
        }
        if(userOtp === user.otp) {
            user.verification = true;
            user.otp = "none";
            await user.save();
            const { password, otp, __v, createdAt, ...userData } = user._doc;
            res.status(200).json({
                success: true,
                message: {...userData},
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

    } catch (error) {
        next(error);
    }
};

export const verifyPhone = async (req, res, next) => {
    try {
        const phone = req.params.phone;
        const user = await User.findById(req.user.id);  
        if(!user) {
            res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.phoneVerification === true) {
            res.status(400).json({
                success: false,
                message: "Phone already verified",
            });
        }

        user.phoneVerification = true;
        user.phone = phone;

        await user.save();
        const { password, otp, __v, createdAt, ...userData } = user._doc;
        
        res.status(200).json({
            success: true,
            message: {...userData},
        });

    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};