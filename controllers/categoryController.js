const categoryModel = require("../models/categoryModel");

// create category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // validation
    if (!title) {
      return res.status(500).send({
        succes: false,
        message: " Please provide category title or imageUrl.",
      });
    }
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "New category has been created successfully!",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create category api.",
      error,
    });
  }
};

// get all categories
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    // validation
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "Nocategories found.",
      });
    }
    res.status(200).send({
      success: true,
      totalCat: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all categories api.",
      error,
    });
  }
};

// update category
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(500).send({
        success: false,
        message: "No category found.",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category api",
      error,
    });
  }
};

// delete category
const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category Id.",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "Category not found.",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.ststus(500).send({
      success: false,
      message: "Error in delete category api",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};
