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
        const id = re.params.id;

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
        const code = re.params.code;

        let foods;

        if(code) {
            foods = await Food.aggregate([
                {$match: {code: code, isAvailable: true}},
                {$sample: {size: 5}},
                {$project: {__v: 0}}
            ]);
        }

        if(foods.length === 0) {
            foods = await Food.aggregate([
                {$match: {isAvailable: true}},
                {$sample: {size: 5}},
                {$project: {__v: 0}}
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

export const getFoodByRestaurant = async (req, res, next) => {
    try {
        const id = re.params.id;

        const foods = await Food.findById({restaurant: id});

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
        const { category, code } = re.params;

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
        const search = re.params.search;

        const results = await Food.aggregate([
            {$search: {
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
        const { category, code } = re.params;

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