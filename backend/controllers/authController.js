import { User } from "../models/user.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import generateOtp from "../utils/otpGenerator.js";
import sendEmail from "../utils/smtpFunction.js";

export const createUser = async (req, res, next) => {
    try {

        const emailRegex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const minPasswordLength = 8;

        if(!emailRegex.test(req.body.email)) {
            res.status(400).json({
                success: false,
                message: "Email in not Valid",
            });
        }
        if(req.body.password < minPasswordLength) {
            res.status(400).json({
                success: true,
                message: "Password too short, aleast "+ minPasswordLength + " required.",
            });
        }

        const emailExists = await User.findOne({email: req.body.email});

        if(emailExists) {
            res.status(400).json({
                success: true,
                message: "Email already exists",
            });
        }

        // Generate OTP
        const  otp = generateOtp();

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            userType: 'Client',
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
            otp: otp
        });

        await newUser.save();

        //send otp to email
        sendEmail(newUser.email, otp);

        res.status(201).json({
            success: true,
            message: "User successfully created",
        });
        
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {

        const emailRegex = /^[a-zA-Z0-9+._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const minPasswordLength = 8;

        if(!emailRegex.test(req.body.email)) {
            res.status(400).json({
                success: false,
                message: "Email in not Valid",
            });
        }
        if(req.body.password < minPasswordLength) {
            res.status(400).json({
                success: true,
                message: "Password too short, aleast "+ minPasswordLength + " required.",
            });
        }

        const user = await User.findOne({email: req.body.email});

        if(!user) {
            res.status(400).json({
                success: true,
                success: "User not found",
            });
        }

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        const dePassword = decryptedPassword.toString(CryptoJS.enc.Utf8);

        if(dePassword !== req.body.password) {
            res.status(400).json({
                success: true,
                success: "Wrong Password",
            });
        }

        const userToken = jwt.sign({
            id: user._id,
            userType: user.userType,
            email: user.email
        }, process.env.JWT_SECRET, {expiresIn: "10d"});

        const {  password, createdAt, updatedAt, __v, otp, ...others } = user._doc;

        res.status(200).json({
            success: true,
            ...others,
            userToken
        });
        
    } catch (error) {
        next(error);
    }
};
