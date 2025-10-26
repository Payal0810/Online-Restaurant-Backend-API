const restaurantModel = require("../models/restaurantModel");

// create restaurant controller
const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address.",
      });
    }
    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New restaurant created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create restaurant api.",
      error,
    });
  }
};

// get all restaurants controller
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all restaurant api.",
      error,
    });
  }
};

// get restaurant by id
const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // validation
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: " Please provide restaurant id.",
      });
    }

    // fond restaurant
    const restaurant = await restaurantModel.findById(restaurantId);

    // validation
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found.",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get restaurant by Id API.",
      error,
    });
  }
};

// delete restaurant
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: " No restaurant found or provide restaurant Id.",
      });
    }
    await restaurantModel.findByIdAndUpdate(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: " Error in delete restaurant api",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
