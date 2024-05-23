import { Food } from "../models/food.js";

export const addFood = async (req, res, next) => {
    try {
        const { title, foodTags, category, code, restaurant, description, time, price, additives, imageUrl} = req.body;

        if(!title || !foodTags || !category || !code || !restaurant || !description || !time || !price || !additives || !imageUrl) {
            res.status(400).json({
                success: false,
                message: "you have a missing field.",
            });
        }

        const newFood = new Food(req.body);

        await newFood.save();

        res.status(201).json({
            success: true,
            message: "Food Created Successfully",
        });

    } catch (error) {
        next(error);
    }
};

export const getFoodById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const food = await Food.findById(id);

        res.status(201).json({
            success: true,
            message: food,
        });

    } catch (error) {
        next(error);
    }
};

export const getRandomFood = async (req, res, next) => {
    try {
        let randomFoodList = [];

        // check if code is provided in the params
        if(req.params.code) {
            randomFoodList = await Food.aggregate([
                {$match: {code: req.params.code}},
                {$sample: {size: 3}},
                {$project: {__v: 0}}
            ]);
        }

        // if no code provided or no food is matched
        if(!randomFoodList.length) {
            randomFoodList = await Food.aggregate([
                {$sample: {size: 5}},
                {$project: {__v: 0}}
            ]);
        }

        // respind with the results
        if(randomFoodList.length) {
            res.status(200).json({
                success: true,
                message: randomFoodList,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "No Food Found",
            });
        }

    } catch (error) {
        next(error);
    }
};

export const getFoodByRestaurant = async (req, res, next) => {
    try {
        const id = req.params.id;

        const foods = await Food.find({restaurant: id});

        res.status(201).json({
            success: true,
            message: foods,
        });

    } catch (error) {
        next(error);
    }
};

export const getFoodByCategoryAndCode = async (req, res, next) => {
    try {
        const { category, code } = req.params;

        const foods = await Food.aggregate([
            {$match: {category: category, code: code, isAvailable: true}},
            {$project: {__v: 0}}
        ]);

        if(foods.length === 0) {
            res.status(200).json({
                success: true,
                message: [],
            });
        }

        res.status(200).json({
            success: true,
            message: foods,
        });

    } catch (error) {
        next(error);
    }
};

export const searchFood = async (req, res, next) => {
    try {
        const search = req.params.search;

        const results = await Food.aggregate([
            {$search: {
                // same used in mongodb's atlas search index
                index: "foods",
                text: {
                    query: search,
                    path: {
                        wildcard: "*"
                    }
                }
            }}
        ]);

        res.status(200).json({
            success: true,
            message: results,
        });

    } catch (error) {
        next(error);
    }
};

export const getRandomFoodByCategoryAndCode = async (req, res, next) => {
    try {
        const { category, code } = req.params;

        let foods;

        foods = await Food.aggregate([
            {$match: {category: category, code: code, isAvailable: true}},
            {$sample: {size: 10}}
        ]);

        if(!foods || foods.length === 0) {
            foods = await Food.aggregate([
                {$match: {code:code, isAvailable: true}},
                {$sample: {size: 10}}
            ]);
        } else {
            foods = await Food.aggregate([
                {$match: {isAvailable: true}},
                {$sample: {size: 10}}
            ]);
        }

        res.status(200).json({
            success: true,
            message: foods,
        });

    } catch (error) {
        next(error);
    }
};