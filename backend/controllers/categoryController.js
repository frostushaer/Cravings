import { Category } from "../models/category.js";

export const createCategory = async (req, res, next) => {
    try {
        const { title, value, imageUrl } = req.body;

        await Category.create({title, value, imageUrl});

        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const getAllCategories = async (req, res, next) => {
    try {

        const categories = await Category.find({title: {$ne: "More"}}, {__v: 0});

        res.status(200).json({
            success: true,
            categories,
        });
        
    } catch (error) {
        next(error);
    }
};

export const getRandomCategories = async (req, res, next) => {
    try {

        const randomCategories = await Category.aggregate([
            {$match: {value: {$ne: "more"}}},
            {$sample: {size: 4}}
        ]);
        const moreCategory = await Category.findOne({value: "more"}, {__V: 0});

        if(moreCategory) {
            randomCategories.push(moreCategory);
        }

        res.status(200).json({
            success: true,
            randomCategories,
        });
        
    } catch (error) {
        next(error);
    }
};