const restaurantModel = require("../models/restaurant.model")

exports.addRestaurant = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Content cannot be empty"
            })
        }
        const restaurant = {
            name: req.body.name,
            location: req.body.location,
            rating: req.body.rating,
            description: req.body.description,
            imageURL: req.body.imageURL,
            phone: req.body.phone,
            category: req.body.category
        }

        const createdRestaurant = await restaurantModel.create(restaurant)

        const responseObject = {
            name: createdRestaurant.name,
            location: createdRestaurant.location,
            rating: createdRestaurant.rating,
            description: createdRestaurant.description,
            imageURL: createdRestaurant.imageURL,
            phone: createdRestaurant.phone,
            category: createdRestaurant.category,
            _id: createdRestaurant._id,
            createdAt: createdRestaurant.createdAt,
            updatedAt: createdRestaurant.updatedAt,
            __v: createdRestaurant.__v
        }

        return res.status(200).json({
            responseData: responseObject,
            message: "successFully added"
        })
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.fetchAllRestaurants = async (req, res) => {
    try {
        const allRestaurants = await restaurantModel.find({})

        return res.status(200).json({
            restaurants: allRestaurants,
            message: "Restaurants fetched successfully"
        })
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.fetchAllCategories = async (req, res) => {
    try {
        const result = await restaurantModel.find({}, { _id: 0, category: 1 })

        const responseObject = []
        result.forEach(doc => responseObject.push(doc.category))

        return res.status(200).send(responseObject)
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.fetchByCategory = async (req, res) => {
    try {

        const result = await restaurantModel.find({ category: req.params.categoryName })

        return res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.fetchById = async (req, res) => {

    try {

        const result = await restaurantModel.find({ _id: req.params.id })

        console.log(result)
        if (result.length === 0) {
            return res.status(404).json(
                {
                    message: "No Restaurant found with the given ID"
                }
            )
        }

        return res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.fetchByRating = async (req, res) => {

    try {

        const result = await restaurantModel.find({ rating: { $gte: req.params.ratingValue } })

        return res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.updateById = async (req, res) => {

    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Restaurant Data is Required"
            })
        }
        const result = await restaurantModel.updateOne({ _id: req.params.id }, { $set: req.body })

        return res.status(200).json({
            message: "restaurant updated successfully"
        })
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.deleteById = async (req, res) => {

    try {

        const result = await restaurantModel.findOneAndDelete({ _id: req.params.id })

        return res.status(200).json({
            restaurant: result,
            message: "Restaurant deleted successfully"
        })
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}

exports.deleteAll = async (req, res) => {

    try {

        const result = await restaurantModel.deleteMany({})

        return res.status(200).json({
            restaurant: result,
            message: "Restaurants deleted successfully"
        })
    }
    catch (err) {
        res.status(500).send("Some error occurred while creating the Restaurant")
        console.log(err)
    }
}